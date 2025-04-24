'use strict';

function insertHtml(source, index, content) {
  return source.slice(0, index) + content + source.slice(index);
}

exports.default = function (context) {
  const pluginId = context.pluginId;
  return {
    plugin: function (markdownIt, _pluginOptions) {
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
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" class="copy-code-blocks-button-icon" viewBox="0 0 24 24">
            <rect width="12" height="14" x="8" y="7"/>
            <polyline points="16 3 4 3 4 17"/>
          </svg>`;

        const copyButtonHtml = `
          <button class="copy-code-blocks-button copy-code-blocks-info-${
            info || 'normal'
          } hljs" title="Copy" aria-label="Copy code" data-plugin-id="${pluginId}">${btnIcon}</button>
        `;

        const tempHtml = insertHtml(defaultHtml, markerIndex, copyButtonHtml);
        return tempHtml;
      };
    },
    assets: function () {
      return [{ name: 'copyCodeBlocks.css' }, { name: 'postMessage.js' }];
    },
  };
};
