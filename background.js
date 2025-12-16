try {
  importScripts('i18n.js');
} catch (e) {
  console.error(e);
}

// 扩展安装或更新时
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // 首次安装,打开设置页面
    chrome.runtime.openOptionsPage();
  } else if (details.reason === 'update') {
    console.log('Extension updated to version:', chrome.runtime.getManifest().version);
  }

  // 初始化语言并创建右键菜单
  await initializeAndCreateMenus();
});

// 监听启动事件，确保菜单存在 (防止意外丢失)
chrome.runtime.onStartup.addListener(async () => {
  await initializeAndCreateMenus();
});


// 初始化语言并创建右键菜单
async function initializeAndCreateMenus() {
  try {
    if (typeof getCurrentLanguage === 'function') {
      const lang = await getCurrentLanguage();
      self.currentLang = lang;
    }
    createContextMenus();
  } catch (error) {
    console.error('Failed to initialize menus:', error);
  }
}

// 创建右键菜单
function createContextMenus() {
  chrome.contextMenus.removeAll(() => {
    // 创建选中文本时的菜单项
    chrome.contextMenus.create({
      id: 'addToMemos',
      title: typeof t === 'function' ? t('add_to_memos') : 'SimpRead',
      contexts: ['selection']
    });

    // 创建页面右键菜单项
    chrome.contextMenus.create({
      id: 'addPageToMemos',
      title: typeof t === 'function' ? t('add_page_to_memos') : 'Save Page Link to Memos',
      contexts: ['page']
    });
  });
}

// 监听右键菜单点击
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'addToMemos') {
    // 添加选中的文本到 Memos
    await addTextToMemos(info.selectionText, tab);
  } else if (info.menuItemId === 'addPageToMemos') {
    // 添加页面链接到 Memos
    const content = `[${tab.title}](${tab.url})`;
    await addTextToMemos(content, tab);
  }
});

// 添加文本到 Memos
async function addTextToMemos(text, tab) {
  try {
    // 获取配置
    const config = await chrome.storage.sync.get(['serverUrl', 'apiToken', 'defaultVisibility']);
    const lang = self.currentLang || 'en';

    if (!config.serverUrl) {
      // 如果没有配置,打开设置页面
      chrome.runtime.openOptionsPage();
      return;
    }

    // Default to PRIVATE if not set
    const visibility = config.defaultVisibility || 'PRIVATE';

    // 创建 Memo
    const response = await fetch(`${config.serverUrl}/api/v1/memos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiToken}`
      },
      body: JSON.stringify({
        content: text,
        visibility: visibility
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // 显示成功通知
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Memos',
      message: typeof t === 'function' ? t('added_to_memos', lang) : 'Saved to Memos!'
    });

  } catch (error) {
    console.error('添加到 Memos 失败:', error);

    // 显示错误通知
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Memos',
      message: `${typeof t === 'function' ? t('failed_to_add', self.currentLang) : 'Failed'}: ${error.message}`
    });
  }
}

// 监听来自其他部分的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getConfig') {
    // 获取配置
    chrome.storage.sync.get(['serverUrl', 'apiToken'], (result) => {
      sendResponse(result);
    });
    return true; // 保持消息通道打开
  }
});
