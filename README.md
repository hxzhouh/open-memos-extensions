# Memos Quick Access - Chrome Extension

> A browser extension for quick access and creation of Memos notes

English | [简体中文](./README.zh-CN.md)

## Features

- ✨ **Quick Create** - Create Memos quickly through the extension popup
- 📝 **Recent Notes** - View your last 5 created memos
- 🔗 **One-Click Access** - Directly open your Memos server
- 🌍 **Multi-language** - Supports Chinese and English, auto-follows browser language
- ⌨️ **Keyboard Shortcuts** - Use `Ctrl+Enter` to quickly create notes
- 🎨 **Clean UI** - Modern and beautiful user interface
- 🔒 **Secure** - Supports API Token authentication

## Screenshots

![main-EN](https://images.hxzhouh.com/blog-images/2025/12/b6430bae2597a50823cb9766a01a8aec.png)

## Installation

### Install from Source

1. Clone this repository or download the source code
   ```bash
   git clone https://github.com/hxzhouh/open-memos-extensions.git
   ```

2. Open Chrome browser and visit `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked"

5. Select this project directory

### Install from Chrome Web Store

(Coming soon)

## Usage

### Initial Setup

1. Click the extension icon, settings page will open automatically on first use

2. Fill in your Memos server address
   - For example: `https://demo.usememos.com`
   - Or your self-hosted address: `https://your-domain.com`

3. (Optional) Fill in API Token
   - If your Memos server requires authentication
   - Generate it at Memos Settings → My Account → Access Tokens

4. Select interface language
   - Auto (Follow browser)
   - 简体中文
   - English

5. Click "Test Connection" to verify configuration

6. Click "Save Settings"

### Creating Notes

1. Click the extension icon in browser toolbar

2. Type your thoughts in the text box

3. Click "Create Memo" button or press `Ctrl+Enter`

4. Upon success, the input box will be cleared automatically and the recent memos list will be refreshed

### Viewing Notes

- The extension popup automatically displays your last 5 memos
- Click "View" link to jump to the original memo
- Click "Refresh" button to update the list
- Click "Open Memos" to directly visit your Memos server

## Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `Ctrl+Enter` / `Cmd+Enter` | Quick create Memo |

## Tech Stack

- Chrome Extension Manifest V3
- Vanilla JavaScript (no framework dependencies)
- Memos API V1
- Internationalization (i18n) support

## Project Structure

```
open-memos-extensions/
├── manifest.json          # Extension configuration
├── background.js          # Background service worker
├── i18n.js               # Internationalization support
├── popup.html            # Popup page
├── popup.js              # Popup logic
├── popup.css             # Popup styles
├── options.html          # Settings page
├── options.js            # Settings logic
├── options.css           # Settings styles
├── icons/                # Icon assets
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # Documentation
```

## Development

### Requirements

- Chrome Browser 88+
- Memos Server (API v1 support)

### Local Development

1. After modifying code, click the "Reload" button on the extension card in `chrome://extensions/`

2. Reopen the extension popup to see the changes

### Debugging

- **Popup Page**: Right-click extension icon → Inspect popup
- **Settings Page**: Open settings page, then right-click → Inspect
- **Background Script**: Click "Service Worker" link in `chrome://extensions/`

## FAQ

### 1. Connection failed, what should I do?

- Check if the server address is correct
- Ensure the server is accessible
- Check network connection
- Review browser console for error messages

### 2. Where can I get the API Token?

1. Login to your Memos server
2. Go to Settings → My Account
3. Find "Access Tokens" section
4. Click "Create" to generate a new token
5. Copy and paste it into the extension settings

### 3. How to switch language?

- Go to extension settings page
- Select your preferred language in "Language Settings"
- You can choose to auto-follow browser language

### 4. Extension icon not showing?

- Ensure the extension is installed correctly
- Check if the extension is enabled
- Try refreshing the browser

## Contributing

Issues and Pull Requests are welcome!

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Related Links

- [Memos Official Website](https://usememos.com)
- [Memos GitHub](https://github.com/usememos/memos)
- [Chrome Extension Development Docs](https://developer.chrome.com/docs/extensions/)

## Changelog

### v1.0.0 (2024-12-16)

- ✨ Initial release
- 🌍 Support for Chinese and English
- ✨ Quick create Memos
- 📝 View recent notes
- ⚙️ Settings page configuration
- 🔒 Support API Token authentication

## Acknowledgments

Thanks to the [Memos](https://github.com/usememos/memos) project for providing an excellent note-taking service.

## Support

If this project helps you, please give it a ⭐️ Star!

---

Made with ❤️ for Memos users
