window.copyCodeBlocksPostMessage = function (ele, pluginId) {
  const text = document
    .querySelector('#' + ele.id)
    .closest('.joplin-editable')
    .querySelector('.joplin-source').textContent;
  try {
    webviewApi.postMessage(pluginId, text).then(response => {
      console.info('Got response in content script: ' + response);
    });
  } catch (err) {
    console.error(err);
    navigator.clipboard.writeText(text);
  }

  ele.title = 'Copied';
  ele.classList.add('copied-code-blocks');

  return false;
};
