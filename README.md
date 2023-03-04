# Copy Code Blocks

[![Release](https://img.shields.io/github/v/release/LightAPIs/joplin-copy-code-blocks?style=flat-square)](https://github.com/LightAPIs/joplin-copy-code-blocks/releases/latest) [![MIT](https://img.shields.io/github/license/LightAPIs/joplin-copy-code-blocks?style=flat-square)](/LICENSE)

> Joplin Plugin

## Features

Add a copy button to the code blocks.

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

## Building

The plugin is built using Webpack, which creates the compiled code in `/dist`. A JPL archive will also be created at the root, which can use to distribute the plugin.

To build the plugin, simply run `npm run dist`.

## License

[MIT](./LICENSE) license
