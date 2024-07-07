'use strict';

function insertHtml(source, index, content) {
  return source.slice(0, index) + content + source.slice(index);
}

exports.default = function (context) {
  const pluginId = context.pluginId;
  return {
    plugin: function (markdownIt, pluginOptions) {
      const vendor = pluginOptions.vendorDir;

      const defaultRender =
        markdownIt.renderer.rules.fence ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };

      markdownIt.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const defaultHtml = defaultRender(tokens, idx, options, env, self);
        const token = tokens[idx];
        const { tag, info } = token;

        if (tag !== 'code') {
          return defaultHtml;
        }

        const markerIndex = defaultHtml.lastIndexOf('</');
        if (markerIndex === -1) {
          return defaultHtml;
        }

        const btnIcon = `
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" class="copy-code-blocks-button-icon"${
            vendor == undefined
              ? ' style="display: block; width: 24px; height: 24px; stroke: #133975; fill: none; stroke-width: 2; stroke-linecap: square; stroke-linejoin: miter;"'
              : ''
          }>
            <rect width="12" height="14" x="8" y="7"/>
            <polyline points="16 3 4 3 4 17"/>
          </svg>`;

        const postMessageCode = `copyCodeBlocksPostMessage(this, '${pluginId}');`;

        //? Because assets will not be loaded under Rich Text editor, add `style="display: none;"`
        const copyButtonHtml =
          vendor == undefined
            ? `
            <button class="copy-code-blocks-button hljs" id="copy-code-blocks-button" style="position: absolute; ${
              info === 'mermaid' ? 'bottom: 0' : 'top: 0'
            }; right: 0; cursor: pointer; background-color: transparent; border: 0; padding: 0; display: none;" title="Copy" aria-label="Copy code" onclick="const text = this.closest('.joplin-editable').querySelector('.joplin-source').textContent; navigator.clipboard.writeText(text); this.classList.add('copied-code-blocks'); this.title='Copied'; this.querySelector('svg').style.stroke = '#a6da4d';" onmouseenter="this.querySelector('svg').style.stroke = this.classList.contains('copied-code-blocks') ? '#a6da4d' : '#2765ca';" onmouseleave="this.querySelector('svg').style.stroke = this.classList.contains('copied-code-blocks') ? '#6aba7b' : '#133975';">${btnIcon}</button>
            `
            : `
          <button class="copy-code-blocks-button copy-code-blocks-info-${
            info || 'normal'
          } hljs" id="copy-code-blocks-button" onclick="${postMessageCode}" title="Copy" aria-label="Copy code" style="display: none;">${btnIcon}</button>
        `;

        const tempHtml = insertHtml(defaultHtml, markerIndex, copyButtonHtml);
        if (vendor == undefined) {
          return insertHtml(
            tempHtml,
            defaultHtml.indexOf('class="joplin-editable"'),
            ` style="position: relative;" onmouseenter="const copyBtn = this.querySelector('#copy-code-blocks-button'); copyBtn.style.display = 'block';" onmouseleave="const copyBtn = this.querySelector('#copy-code-blocks-button'); copyBtn.style.display = 'none';"`
          );
        }
        return tempHtml;
      };
    },
    assets: function () {
      return [{ name: 'copyCodeBlocks.css' }, { name: 'postMessage.js' }];
    },
  };
};
