'use strict';

function insertHtml(source, index, content) {
  return source.slice(0, index) + content + source.slice(index);
}

module.exports.default = function (context) {
  const pluginId = context.pluginId;
  return {
    plugin: function (markdownIt, _options) {
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
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" class="copy-code-blocks-button-icon">
            <rect width="12" height="14" x="8" y="7"/>
            <polyline points="16 3 4 3 4 17"/>
          </svg>`;

        const btnId = `copy-code-blocks-button-${idx}`;
        const postMessageCode = `copyCodeBlocksPostMessage(this, '${pluginId}');`;

        //? Because assets will not be loaded under Rich Text editor, add `style="display: none;"`
        const copyButtonHtml = `
          <button class="copy-code-blocks-button copy-code-blocks-info-${
            info || 'normal'
          } hljs" id="${btnId}" onclick="${postMessageCode}" title="Copy" aria-label="Copy code" style="display: none;">${btnIcon}</button>
        `;

        return insertHtml(defaultHtml, markerIndex, copyButtonHtml);
      };
    },
    assets: function () {
      return [{ name: 'copyCodeBlocks.css' }, { name: 'postMessage.js' }];
    },
  };
};
