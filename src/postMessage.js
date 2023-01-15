window.copyCodeBlocksPostMessage = function (ele, pluginId) {
  webviewApi
    .postMessage(
      pluginId,
      document
        .querySelector('#' + ele.id)
        .closest('.joplin-editable')
        .querySelector('.joplin-source').textContent
    )
    .then(response => {
      console.info('Got response in content script: ' + response);
      ele.title = 'Copied';
      ele.classList.add('copied-code-blocks');
    });
  return false;
};
