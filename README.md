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

And only if you're using npm, add the following:

```diff
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
+   "vite-tauri": "vite-tauri",
  }
}
```

## Usage

```sh
# pnpm
pnpm vite-tauri <subcommand>
# yarn
yarn vite-tauri <subcommand>
# npm
npm run vite-tauri <subcommand>
```

#### Supported Subcommands:

- `dev` - Starts your Vite/Tauri app with hot reload.
- `build` - Builds your Vite/Tauri executable and installer.
- All other Tauri CLI [subcommands and flags](https://tauri.studio/docs/api/cli) are supported.

## License

[MIT](./LICENSE) License
