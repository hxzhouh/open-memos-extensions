// 多语言配置
const translations = {
  'zh-CN': {
    // Popup
    'app_title': '📝 Memos',
    'settings': '设置',
    'quick_create': '快速创建',
    'memo_placeholder': '输入你的想法...',
    'create_memo': '创建 Memo',
    'clear': '清空',
    'recent_memos': '最近笔记',
    'refresh': '刷新',
    'open_memos': '打开 Memos',
    'view': '查看',
    'loading': '加载中...',
    'empty_state': '暂无笔记',
    'config_required': '请先在设置中配置 Memos 服务器',
    'input_required': '请输入内容',
    'creating': '创建中...',
    'create_success': '创建成功!',
    'create_failed': '创建失败',
    'load_failed': '加载失败',
    'config_server_first': '请先在设置中配置 Memos 服务器地址',
    'select_tag': '选择标签',
    'no_tags': '暂无标签',
    'load_tags_failed': '加载标签失败',
    'load_tags_failed': '加载标签失败',
    'public': '所有人可见',
    'protected': '登录用户可见',
    'private': '仅自己可见',
    'add_to_memos': '添加到 Memos',
    'add_page_to_memos': '将页面链接添加到 Memos',
    'added_to_memos': '已添加到 Memos!',
    'failed_to_add': '添加失败',

    // Options
    'extension_settings': '📝 Memos 扩展设置',
    'basic_settings': '基本设置',
    'server_url': 'Memos 服务器地址',
    'api_token': 'API Token',
    'required': '*',
    'optional': '(可选)',
    'server_url_placeholder': 'https://your-memos-server.com',
    'api_token_placeholder': 'your-api-token',
    'server_url_help': '填写你的 Memos 服务器完整地址，例如: https://demo.usememos.com',
    'api_token_help': '用于私有服务器认证。可在 Memos 设置 → 我的账户 → Access Tokens 中生成',
    'usage_guide': '使用说明',
    'how_to_get_token': '如何获取 API Token?',
    'token_step1': '登录你的 Memos 服务器',
    'token_step2': '进入 设置 → 我的账户',
    'token_step3': '找到 "Access Tokens" 部分',
    'token_step4': '点击 "创建" 生成新 token',
    'token_step5': '复制 token 并粘贴到上方输入框',
    'shortcuts': '快捷键',
    'shortcut_create': '快速创建 Memo',
    'save_settings': '保存设置',
    'test_connection': '测试连接',
    'reset': '重置',
    'settings_saved': '设置已保存',
    'settings_save_failed': '保存失败',
    'fill_server_url': '请先填写服务器地址',
    'invalid_url': '服务器地址格式不正确',
    'testing_connection': '正在测试连接...',
    'connection_success': '✅ 连接成功!',
    'connection_success_invalid_token': '⚠️ 连接成功，但 API Token 可能无效',
    'connection_failed': '❌ 连接失败',
    'confirm_reset': '确定要重置所有设置吗?',
    'settings_reset': '设置已重置',
    'reset_failed': '重置失败',
    'language_settings': '语言设置',
    'language': '界面语言',
    'default_visibility': '默认可见范围',
    'language_auto': '自动 (跟随浏览器)',
    'language_zh': '简体中文',
    'language_en': 'English',
    'footer_text': 'Memos Quick Access Extension v1.0.0'
  },
  'en': {
    // Popup
    'app_title': '📝 Memos',
    'settings': 'Settings',
    'quick_create': 'Quick Create',
    'memo_placeholder': 'What\'s on your mind...',
    'create_memo': 'Create Memo',
    'clear': 'Clear',
    'recent_memos': 'Recent Memos',
    'refresh': 'Refresh',
    'open_memos': 'Open Memos',
    'view': 'View',
    'loading': 'Loading...',
    'empty_state': 'No memos yet',
    'config_required': 'Please configure Memos server in settings',
    'input_required': 'Please enter content',
    'creating': 'Creating...',
    'create_success': 'Created successfully!',
    'create_failed': 'Creation failed',
    'load_failed': 'Load failed',
    'config_server_first': 'Please configure Memos server address in settings first',
    'select_tag': 'Select Tag',
    'no_tags': 'No tags available',
    'load_tags_failed': 'Failed to load tags',
    'load_tags_failed': 'Failed to load tags',
    'public': 'Public',
    'protected': 'Members',
    'private': 'Private',
    'add_to_memos': 'Add to Memos',
    'add_page_to_memos': 'Save Page Link to Memos',
    'added_to_memos': 'Saved to Memos!',
    'failed_to_add': 'Failed to save',

    // Options
    'extension_settings': '📝 Memos Extension Settings',
    'basic_settings': 'Basic Settings',
    'server_url': 'Memos Server URL',
    'api_token': 'API Token',
    'required': '*',
    'optional': '(Optional)',
    'server_url_placeholder': 'https://your-memos-server.com',
    'api_token_placeholder': 'your-api-token',
    'server_url_help': 'Enter your Memos server URL, e.g.: https://demo.usememos.com',
    'api_token_help': 'Required for private server authentication. Generate at Settings → My Account → Access Tokens',
    'usage_guide': 'Usage Guide',
    'how_to_get_token': 'How to get API Token?',
    'token_step1': 'Login to your Memos server',
    'token_step2': 'Go to Settings → My Account',
    'token_step3': 'Find "Access Tokens" section',
    'token_step4': 'Click "Create" to generate a new token',
    'token_step5': 'Copy the token and paste it above',
    'shortcuts': 'Shortcuts',
    'shortcut_create': 'Quick create Memo',
    'save_settings': 'Save Settings',
    'test_connection': 'Test Connection',
    'reset': 'Reset',
    'settings_saved': 'Settings saved',
    'settings_save_failed': 'Save failed',
    'fill_server_url': 'Please fill in server URL first',
    'invalid_url': 'Invalid server URL format',
    'testing_connection': 'Testing connection...',
    'connection_success': '✅ Connection successful!',
    'connection_success_invalid_token': '⚠️ Connected, but API Token may be invalid',
    'connection_failed': '❌ Connection failed',
    'confirm_reset': 'Are you sure you want to reset all settings?',
    'settings_reset': 'Settings reset',
    'reset_failed': 'Reset failed',
    'language_settings': 'Language Settings',
    'language': 'Interface Language',
    'default_visibility': 'Default Visibility',
    'language_auto': 'Auto (Follow Browser)',
    'language_zh': '简体中文',
    'language_en': 'English',
    'footer_text': 'Memos Quick Access Extension v1.0.0'
  }
};

// 获取当前语言
async function getCurrentLanguage() {
  try {
    const result = await chrome.storage.sync.get(['language']);
    if (result.language && result.language !== 'auto') {
      return result.language;
    }
  } catch (error) {
    console.error('Failed to get language setting:', error);
  }

  // 默认使用浏览器语言
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('zh') ? 'zh-CN' : 'en';
}

// 获取翻译文本
function t(key, lang = null) {
  if (!lang) {
    // 如果没有提供语言，使用全局语言（需要先设置）
    const globalContext = typeof window !== 'undefined' ? window : self;
    lang = globalContext.currentLang || 'en';
  }
  return translations[lang]?.[key] || translations['en']?.[key] || key;
}

// 应用翻译到页面
async function applyTranslations() {
  const lang = await getCurrentLanguage();
  const globalContext = typeof window !== 'undefined' ? window : self;
  globalContext.currentLang = lang;

  // 翻译所有带有 data-i18n 属性的元素
  if (typeof document !== 'undefined') {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = t(key, lang);

      // 根据元素类型设置文本
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.type === 'button' || element.type === 'submit') {
          element.value = translation;
        } else {
          element.placeholder = translation;
        }
      } else {
        element.textContent = translation;
      }
    });

    // 翻译所有带有 data-i18n-title 属性的元素
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      element.title = t(key, lang);
    });
  }

  return lang;
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getCurrentLanguage, t, applyTranslations, translations };
}
