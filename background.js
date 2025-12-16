// 扩展安装或更新时
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // 首次安装,打开设置页面
    chrome.runtime.openOptionsPage();
  } else if (details.reason === 'update') {
    console.log('Extension updated to version:', chrome.runtime.getManifest().version);
  }
});

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
