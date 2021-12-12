# vite-plugin-tauri

Integrate [Tauri](https://github.com/tauri-apps/tauri) in a [Vite](https://github.com/vitejs/vite) project to build cross-platform apps

[![NPM Version](https://img.shields.io/npm/v/vite-plugin-tauri)](https://www.npmjs.com/package/vite-plugin-tauri)

## Install

Make sure to [setup your environment](https://tauri.studio/en/docs/getting-started/intro#setting-up-your-environment) for Tauri development.

> This package requires Node.js version `^12.20.0 || ^14.13.1 || >=16.0.0`

```sh
# pnpm
pnpm add -D vite-plugin-tauri
# yarn
yarn add -D vite-plugin-tauri
# npm
npm i -D vite-plugin-tauri
```
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
- Other Tauri CLI [subcommands and flags](https://github.com/tauri-apps/tauri/blob/dev/tooling/cli.rs/src/cli.yml) are supported.


#### Note:
> Running `dev` or `build` will initialize Tauri and add `src-tauri` folder if it doesn't exist.

## License

[MIT](./LICENSE) License © 2021 [Amr Bashir](https://github.com/amrbashir)
