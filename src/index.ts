import joplin from 'api';
import { ContentScriptType } from 'api/types';

joplin.plugins.register({
  onStart: async function () {
    const contentScriptId = 'com.joplin.copy.codeBlocks';
    await joplin.contentScripts.register(ContentScriptType.MarkdownItPlugin, contentScriptId, './copyCodeBlocks.js');
    await joplin.contentScripts.onMessage(contentScriptId, (message: string) => {
      // console.info(message);
      joplin.clipboard.writeText(message);
      return `${contentScriptId}+${Date.now().toString()}`;
    });
  },
});
