# Copy Code Blocks

[![Release](https://img.shields.io/github/v/release/LightAPIs/joplin-copy-code-blocks?style=flat-square)](https://github.com/LightAPIs/joplin-copy-code-blocks/releases/latest) [![MIT](https://img.shields.io/github/license/LightAPIs/joplin-copy-code-blocks?style=flat-square)](/LICENSE)

## Features

This is a plugin for [Joplin](https://joplinapp.org/). Add a copy button to the code blocks.

## Preview

![copy](https://gcore.jsdelivr.net/gh/LightAPIs/PicGoImg@master/img/202301151550499.gif)

## Installation

### Automatic

1. Open [Joplin](https://joplinapp.org/), go to **Tools > Options > Plugins**.
2. Search for `Copy Code Blocks`.
3. Install this plugin.
4. Finally, restart the application.

### Manual

1. Go to the [Releases](https://github.com/LightAPIs/joplin-copy-code-blocks/releases/latest) to download the plugin package `zip` file and unzip it.
2. Open [Joplin](https://joplinapp.org/), go to **Tools > Options > Plugins**.
3. Click **Manage your plugins > Install from file**, select the previously unzipped `jpl` file.
4. Finally, restart the application.

## Custom the button style

You can customize the style of the button by adding content in [`userstyle.css`](https://joplinapp.org/help/apps/custom_css). The plugin provides the following CSS custom variables:

- `--copy-code-blocks-color`: Button color. *The default value is `#133975`.*
- `--copy-code-blocks-hover-color`: Button hover color. *The default value is `#2765ca`.*
- `--copy-code-blocks-copied-color`: Button copied color. *The default value is `#6aba7b`.*
- `--copy-code-blocks-copied-hover-color`: Button copied hover color. *The default value is `#a6da4d`.*
- `--copy-code-blocks-top-spacing`: Button top spacing. *The default value is `0px`.*
- `--copy-code-blocks-right-spacing`: Button right spacing. *The default value is `0px`.*

For example:

```css
body {
  --copy-code-blocks-color: #252d3a;
  --copy-code-blocks-copied-color: #189463;
  --copy-code-blocks-top-spacing: 4px;
  --copy-code-blocks-right-spacing: 4px;
}
```

## Building

The plugin is built using Webpack, which creates the compiled code in `/dist`. A JPL archive will also be created at the root, which can use to distribute the plugin.

To build the plugin, simply run `npm run dist`.

## License

[MIT](./LICENSE) license
