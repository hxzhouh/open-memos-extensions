# Memos Quick Access - Chrome 扩展

> 快速访问和创建 Memos 笔记的浏览器扩展

[English](./README.md) | 简体中文

## 功能特性

- ✨ **快速创建** - 通过扩展弹窗快速创建 Memos
- 📝 **最近笔记** - 查看最近创建的 5 条笔记
- 🔗 **一键跳转** - 直接打开 Memos 服务器
- 🌍 **多语言支持** - 支持中文和英文界面,自动跟随浏览器语言
- ⌨️ **快捷键支持** - 使用 `Ctrl+Enter` 快速创建笔记
- 🎨 **简洁美观** - 现代化的用户界面设计
- 🔒 **安全私密** - 支持 API Token 认证

## 截图

（待添加截图）

## 安装方法

### 从源码安装

1. 克隆本仓库或下载源码
   ```bash
   git clone https://github.com/yourusername/open-memos-extensions.git
   ```

2. 打开 Chrome 浏览器,访问 `chrome://extensions/`

3. 开启右上角的"开发者模式"

4. 点击"加载已解压的扩展程序"

5. 选择本项目目录

### 从 Chrome Web Store 安装

（即将上线）

## 使用说明

### 首次配置

1. 点击扩展图标,首次使用会自动打开设置页面

2. 填写你的 Memos 服务器地址
   - 例如: `https://demo.usememos.com`
   - 或你的自托管地址: `https://your-domain.com`

3. (可选) 填写 API Token
   - 如果你的 Memos 服务器需要认证
   - 在 Memos 设置 → 我的账户 → Access Tokens 中生成

4. 选择界面语言
   - 自动 (跟随浏览器)
   - 简体中文
   - English

5. 点击"测试连接"验证配置

6. 点击"保存设置"

### 创建笔记

1. 点击浏览器工具栏的扩展图标

2. 在文本框中输入你的想法

3. 点击"创建 Memo"按钮或按 `Ctrl+Enter`

4. 创建成功后会自动清空输入框并刷新最近笔记列表

### 查看笔记

- 扩展弹窗会自动显示最近 5 条笔记
- 点击"查看"链接可跳转到原笔记
- 点击"刷新"按钮可更新列表
- 点击"打开 Memos"可直接访问你的 Memos 服务器

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Enter` / `Cmd+Enter` | 快速创建 Memo |

## 技术栈

- Chrome Extension Manifest V3
- Vanilla JavaScript (无框架依赖)
- Memos API V1
- 国际化 (i18n) 支持

## 项目结构

```
open-memos-extensions/
├── manifest.json          # 扩展配置文件
├── background.js          # 后台服务 Worker
├── i18n.js               # 国际化支持
├── popup.html            # 弹窗页面
├── popup.js              # 弹窗逻辑
├── popup.css             # 弹窗样式
├── options.html          # 设置页面
├── options.js            # 设置逻辑
├── options.css           # 设置样式
├── icons/                # 图标资源
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # 说明文档
```

## 开发

### 环境要求

- Chrome 浏览器 88+
- Memos 服务器 (支持 API v1)

### 本地开发

1. 修改代码后,在 `chrome://extensions/` 页面点击扩展卡片的"刷新"按钮

2. 重新打开扩展弹窗查看效果

### 调试

- **弹窗页面**: 右键点击扩展图标 → 检查弹出内容
- **设置页面**: 打开设置页面后右键 → 检查
- **后台脚本**: 在 `chrome://extensions/` 点击"Service Worker"链接

## 常见问题

### 1. 连接失败怎么办?

- 检查服务器地址是否正确
- 确保服务器可以正常访问
- 检查网络连接
- 查看浏览器控制台错误信息

### 2. API Token 在哪里获取?

1. 登录你的 Memos 服务器
2. 进入 设置 → 我的账户
3. 找到 "Access Tokens" 部分
4. 点击 "创建" 生成新 token
5. 复制并粘贴到扩展设置中

### 3. 如何切换语言?

- 进入扩展设置页面
- 在"语言设置"部分选择你想要的语言
- 可以选择自动跟随浏览器语言

### 4. 扩展图标不显示?

- 确保已正确安装扩展
- 检查扩展是否启用
- 尝试刷新浏览器

## 贡献

欢迎提交 Issue 和 Pull Request!

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 相关链接

- [Memos 官方网站](https://usememos.com)
- [Memos GitHub](https://github.com/usememos/memos)
- [Chrome 扩展开发文档](https://developer.chrome.com/docs/extensions/)

## 更新日志

### v1.0.0 (2024-12-16)

- ✨ 初始版本发布
- 🌍 支持中英文双语
- ✨ 快速创建 Memos
- 📝 查看最近笔记
- ⚙️ 设置页面配置
- 🔒 支持 API Token 认证

## 致谢

感谢 [Memos](https://github.com/usememos/memos) 项目提供优秀的笔记服务。

## 支持

如果这个项目对你有帮助,欢迎给个 ⭐️ Star!

---

Made with ❤️ for Memos users
