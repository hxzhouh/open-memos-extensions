// 初始化
document.addEventListener('DOMContentLoaded', async () => {
  await applyTranslations();
  await loadSettings();
  initializeEventListeners();
});

// 加载已保存的设置
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['serverUrl', 'apiToken', 'language', 'defaultVisibility']);

    if (result.serverUrl) {
      document.getElementById('serverUrl').value = result.serverUrl;
    }

    if (result.apiToken) {
      document.getElementById('apiToken').value = result.apiToken;
    }

    if (result.defaultVisibility) {
      document.getElementById('defaultVisibility').value = result.defaultVisibility;
    }

    if (result.language) {
      document.getElementById('language').value = result.language;
    } else {
      document.getElementById('language').value = 'auto';
    }
  } catch (error) {
    console.error('加载设置失败:', error);
    showStatus(t('settings_save_failed'), 'error');
  }
}

// 初始化事件监听
function initializeEventListeners() {
  // 表单提交
  document.getElementById('settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveSettings();
  });

  // 测试连接
  document.getElementById('testBtn').addEventListener('click', testConnection);

  // 重置设置
  document.getElementById('resetBtn').addEventListener('click', resetSettings);

  // 语言切换
  document.getElementById('language').addEventListener('change', async (e) => {
    const newLang = e.target.value;
    await chrome.storage.sync.set({ language: newLang });
    await applyTranslations();
    showStatus(t('settings_saved'), 'success');
  });
}

// 保存设置
async function saveSettings() {
  const serverUrl = document.getElementById('serverUrl').value.trim();
  const apiToken = document.getElementById('apiToken').value.trim();
  const defaultVisibility = document.getElementById('defaultVisibility').value;
  const language = document.getElementById('language').value;

  // 验证服务器地址
  if (!serverUrl) {
    showStatus(t('fill_server_url'), 'error');
    return;
  }

  // 验证 URL 格式
  let parsedUrl;
  try {
    parsedUrl = new URL(serverUrl);
  } catch (error) {
    showStatus(t('invalid_url'), 'error');
    return;
  }

  // 移除末尾的斜杠
  const cleanServerUrl = serverUrl.replace(/\/$/, '');

  try {
    // 请求访问该服务器的权限
    const permission = `${parsedUrl.protocol}//${parsedUrl.host}/*`;
    const granted = await chrome.permissions.request({
      origins: [permission]
    });

    if (!granted) {
      showStatus(t('permission_denied') || '需要授权访问您的 Memos 服务器才能使用此扩展', 'error');
      return;
    }

    await chrome.storage.sync.set({
      serverUrl: cleanServerUrl,
      apiToken: apiToken,
      defaultVisibility: defaultVisibility,
      language: language
    });

    showStatus(t('settings_saved'), 'success');

    // 2 秒后自动关闭
    setTimeout(() => {
      window.close();
    }, 2000);

  } catch (error) {
    console.error('保存设置失败:', error);
    showStatus(`${t('settings_save_failed')}: ${error.message}`, 'error');
  }
}

// 测试连接
async function testConnection() {
  const serverUrl = document.getElementById('serverUrl').value.trim();
  const apiToken = document.getElementById('apiToken').value.trim();

  if (!serverUrl) {
    showStatus(t('fill_server_url'), 'error');
    return;
  }

  const cleanServerUrl = serverUrl.replace(/\/$/, '');

  try {
    showStatus(t('testing_connection'), 'info');

    const headers = {
      'Content-Type': 'application/json'
    };

    if (apiToken) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    }

    const response = await fetch(`${cleanServerUrl}/api/v1/memos?limit=1`, {
      method: 'GET',
      headers: headers
    });

    if (response.ok) {
      showStatus(t('connection_success'), 'success');
    } else if (response.status === 401) {
      showStatus(t('connection_success_invalid_token'), 'warning');
    } else {
      showStatus(`${t('connection_failed')}: HTTP ${response.status}`, 'error');
    }

  } catch (error) {
    console.error('测试连接失败:', error);
    showStatus(`${t('connection_failed')}: ${error.message}`, 'error');
  }
}

// 重置设置
async function resetSettings() {
  if (!confirm(t('confirm_reset'))) {
    return;
  }

  try {
    await chrome.storage.sync.clear();
    document.getElementById('serverUrl').value = '';
    document.getElementById('apiToken').value = '';
    document.getElementById('defaultVisibility').value = 'PRIVATE';
    document.getElementById('language').value = 'auto';
    showStatus(t('settings_reset'), 'success');
    // 重新加载翻译
    await applyTranslations();
  } catch (error) {
    console.error('重置设置失败:', error);
    showStatus(`${t('reset_failed')}: ${error.message}`, 'error');
  }
}

// 显示状态消息
function showStatus(message, type = 'info') {
  const statusElement = document.getElementById('status');
  statusElement.textContent = message;
  statusElement.className = `status ${type}`;
  statusElement.classList.remove('hidden');

  // 3 秒后自动隐藏(除了成功消息)
  if (type !== 'success') {
    setTimeout(() => {
      statusElement.classList.add('hidden');
    }, 3000);
  }
}
