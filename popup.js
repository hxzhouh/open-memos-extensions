// Memos API 配置
let memosConfig = {
  serverUrl: '',
  apiToken: ''
};

// 初始化
document.addEventListener('DOMContentLoaded', async () => {
  await applyTranslations();
  await loadConfig();
  initializeUI();
  loadRecentMemos();
});

// 加载配置
async function loadConfig() {
  try {
    const result = await chrome.storage.sync.get(['serverUrl', 'apiToken']);
    memosConfig.serverUrl = result.serverUrl || '';
    memosConfig.apiToken = result.apiToken || '';

    // 更新打开 Memos 按钮的链接
    const openMemosBtn = document.getElementById('openMemosBtn');
    if (memosConfig.serverUrl) {
      openMemosBtn.href = memosConfig.serverUrl;
    }
  } catch (error) {
    console.error('加载配置失败:', error);
  }
}

// 初始化 UI 事件
function initializeUI() {
  // 创建 Memo 按钮
  document.getElementById('createBtn').addEventListener('click', createMemo);

  // 清空按钮
  document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('memoContent').value = '';
  });

  // 刷新按钮
  document.getElementById('refreshBtn').addEventListener('click', loadRecentMemos);

  // 设置按钮
  document.getElementById('settingsBtn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  // 支持 Ctrl+Enter 快速创建
  document.getElementById('memoContent').addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      createMemo();
    }
  });
}

// 创建 Memo
async function createMemo() {
  const content = document.getElementById('memoContent').value.trim();

  if (!content) {
    showStatus(t('input_required'), 'error');
    return;
  }

  if (!memosConfig.serverUrl) {
    showStatus(t('config_server_first'), 'error');
    setTimeout(() => {
      chrome.runtime.openOptionsPage();
    }, 1500);
    return;
  }

  try {
    showStatus(t('creating'), 'info');

    const response = await fetch(`${memosConfig.serverUrl}/api/v1/memos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${memosConfig.apiToken}`
      },
      body: JSON.stringify({
        content: content,
        visibility: 'PRIVATE'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    showStatus(t('create_success'), 'success');
    document.getElementById('memoContent').value = '';

    // 刷新最近笔记列表
    setTimeout(() => {
      loadRecentMemos();
    }, 500);

  } catch (error) {
    console.error('创建 Memo 失败:', error);
    showStatus(`${t('create_failed')}: ${error.message}`, 'error');
  }
}

// 加载最近的 Memos
async function loadRecentMemos() {
  const container = document.getElementById('recentMemos');

  if (!memosConfig.serverUrl) {
    container.innerHTML = `<div class="empty-state">${t('config_required')}</div>`;
    return;
  }

  try {
    container.innerHTML = `<div class="loading">${t('loading')}</div>`;

    const response = await fetch(
      `${memosConfig.serverUrl}/api/v1/memos?limit=5`,
      {
        headers: {
          'Authorization': `Bearer ${memosConfig.apiToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const memos = data.memos || [];

    if (memos.length === 0) {
      container.innerHTML = `<div class="empty-state">${t('empty_state')}</div>`;
      return;
    }

    container.innerHTML = memos.map(memo => createMemoElement(memo)).join('');

  } catch (error) {
    console.error('加载 Memos 失败:', error);
    container.innerHTML = `<div class="error-state">${t('load_failed')}: ${error.message}</div>`;
  }
}

// 创建 Memo 元素
function createMemoElement(memo) {
  const content = memo.content || '';
  const displayContent = content.length > 100
    ? content.substring(0, 100) + '...'
    : content;

  const createdTime = memo.createTime
    ? new Date(memo.createTime).toLocaleString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';

  const memoUrl = `${memosConfig.serverUrl}/m/${memo.name || memo.id}`;

  return `
    <div class="memo-item">
      <div class="memo-content">${escapeHtml(displayContent)}</div>
      <div class="memo-footer">
        <span class="memo-time">${createdTime}</span>
        <a href="${memoUrl}" target="_blank" class="memo-link">${t('view')}</a>
      </div>
    </div>
  `;
}

// 显示状态消息
function showStatus(message, type = 'info') {
  const statusElement = document.getElementById('status');
  statusElement.textContent = message;
  statusElement.className = `status ${type}`;
  statusElement.classList.remove('hidden');

  setTimeout(() => {
    statusElement.classList.add('hidden');
  }, 3000);
}

// HTML 转义
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
