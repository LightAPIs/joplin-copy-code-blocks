document.addEventListener('click', evt => {
  const copyBtn = evt.target.closest('.copy-code-blocks-button');
  if (copyBtn) {
    const text = copyBtn.closest('.joplin-editable').querySelector('.joplin-source').textContent;
    const pluginId = copyBtn.dataset.pluginId;
    try {
      webviewApi.postMessage(pluginId, text).then(response => {
        console.info('Got response in content script: ' + response);
      });
    } catch (err) {
      console.error(err);
      navigator.clipboard.writeText(text);
    }

    copyBtn.title = 'Copied';
    copyBtn.classList.add('copied-code-blocks');

    return false;
  }
});
