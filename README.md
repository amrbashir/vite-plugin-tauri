# vite-plugin-tauri

Integrate [Tauri](https://github.com/tauri-apps/tauri) in a [Vite](https://github.com/vitejs/vite) project to build cross-platform apps

[![NPM Version](https://img.shields.io/npm/v/vite-plugin-tauri)](https://www.npmjs.com/package/vite-plugin-tauri)

## Install

> Make sure to [setup your environment](https://tauri.studio/en/docs/getting-started/intro#setting-up-your-environment) for Tauri development.

```sh
# pnpm
pnpm add -D vite-plugin-tauri @tauri-apps/cli
# yarn
yarn add -D vite-plugin-tauri @tauri-apps/cli
# npm
npm i -D vite-plugin-tauri @tauri-apps/cli
```

## Usage

```ts
// vite.config.js
import { defineConfig } from 'vite'
import { tauri } from "vite-plugin-tauri" // 1. import the plugin

export default defineConfig({
  plugins: [
    tauri(), // 2. add it to the plugins list
  ],

  // 3. optional but recommended
  clearScreen: false,
  server: {
    open: false
  },
})
```

## Options

### `debug`

- **Type:** `bool`
- **Default:** `false`

  Enable or disable building Tauri in debug mode.

## Advanced Usage

### Use a separate config for Tauri

Create a `vite.config.tauri.js` with the following content

```ts
import { defineConfig, mergeConfig } from "vite";
import baseViteConfig from "./vite.config";
import { tauri } from "vite-plugin-tauri";

export default defineConfig(
  mergeConfig(
    baseViteConfig,
    defineConfig({
      plugins: [
        tauri()
      ],

      // optional but recommended
      clearScreen: false,
      server: { 
        open: false,
      },
    })
  )
);
```

Modify `package.json`:

```diff
// package.json
{
  ..
  "scripts": {
    "dev": "vite",
    "build": "vite build",
+   "dev:tauri": "vite --config vite.config.tauri.js",
+   "build:tauri": "vite build --config vite.config.tauri.js",
    "preview": "vite preview"
  },
  ..
}
```

Now you can build or develop Tauri without chaning your existing web dev flow.

## License

[MIT](./LICENSE) © Amr Bashir
