// Memos API Config
let memosConfig = {
  serverUrl: '',
  apiToken: '',
  defaultVisibility: 'PRIVATE'
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await applyTranslations();
  await loadConfig();
  initializeUI();
});

// Load Config
async function loadConfig() {
  try {
    const result = await chrome.storage.sync.get(['serverUrl', 'apiToken', 'defaultVisibility']);
    memosConfig.serverUrl = result.serverUrl || '';
    memosConfig.apiToken = result.apiToken || '';
    memosConfig.defaultVisibility = result.defaultVisibility || 'PRIVATE';

    // Set default visibility in dropdown
    const visibilitySelect = document.getElementById('visibilitySelect');
    if (visibilitySelect) {
      visibilitySelect.value = memosConfig.defaultVisibility;
    }
  } catch (error) {
    console.error('Failed to load config:', error);
  }
}

// Initialize UI Events
function initializeUI() {
  // Create Memo Button
  document.getElementById('createBtn').addEventListener('click', createMemo);

  // Settings Button
  document.getElementById('settingsBtn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  // Toolbar Actions
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.dataset.action;
      handleToolbarAction(action);
    });
  });

  // Ctrl+Enter Quick Create
  document.getElementById('memoContent').addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      createMemo();
    }
  });
}

// Handle Toolbar Actions
function handleToolbarAction(action) {
  const textarea = document.getElementById('memoContent');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;

  let insertText = '';
  let newCursorPos = start;

  switch (action) {
    case 'tag':
      insertText = '# ';
      newCursorPos = start + insertText.length;
      break;
    case 'checklist':
      // If at start of line or previous char is newline
      if (start === 0 || text[start - 1] === '\n') {
        insertText = '- [ ] ';
      } else {
        insertText = '\n- [ ] ';
      }
      newCursorPos = start + insertText.length;
      break;
    case 'code':
      insertText = '```\n\n```';
      newCursorPos = start + 4; // Position inside the block
      break;
    case 'link':
      insertText = '[]()';
      newCursorPos = start + 1; // Position inside brackets
      break;
  }

  if (insertText) {
    textarea.value = text.substring(0, start) + insertText + text.substring(end);
    textarea.focus();
    textarea.setSelectionRange(newCursorPos, newCursorPos);
  }
}

// Create Memo
async function createMemo() {
  const content = document.getElementById('memoContent').value.trim();
  const visibility = document.getElementById('visibilitySelect').value;

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
        visibility: visibility
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    await response.json();

    showStatus(t('create_success'), 'success');
    document.getElementById('memoContent').value = '';

    // Reset visibility to configured default preference
    document.getElementById('visibilitySelect').value = memosConfig.defaultVisibility;

  } catch (error) {
    console.error('Failed to create memo:', error);
    showStatus(`${t('create_failed')}: ${error.message}`, 'error');
  }
}

// Show Status Message
function showStatus(message, type = 'info') {
  const statusElement = document.getElementById('status');
  statusElement.textContent = message;

  // Remove previous classes
  statusElement.className = 'status-overlay';
  statusElement.classList.add(type);

  // Show
  statusElement.classList.remove('hidden');

  // Hide after 3 seconds
  setTimeout(() => {
    statusElement.classList.add('hidden');
  }, 3000);
}
