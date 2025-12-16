# My Awesome Memos Extension

This is a browser extension created for the Memos application.


## File Content

### `manifest.json`

```json
{
  "manifest_version": 3,
  "name": "My Awesome Memos Extension",
  "version": "1.0",
  "description": "A browser extension to enhance the memos application.",
  "action": {
    "default_popup": "popup.html"
  }
}
```

### `popup.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Awesome Memos Extension</title>
  </head>
  <body>
    <h1>My Awesome Memos Extension</h1>
    <div id="message"></div>
    <script src="popup.js"></script>
  </body>
</html>
```

### `popup.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const messageElement = document.getElementById('message');
  if (messageElement) {
    messageElement.textContent = 'Hello from My Awesome Memos Extension!';
  }
});
```
