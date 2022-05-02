## [1.1.3](https://github.com/amrbashir/vite-plugin-tauri/compare/v1.1.2...v1.1.3) (2022-05-02)

* update dependencies


## [1.1.2](https://github.com/amrbashir/vite-plugin-tauri/compare/v1.1.1...v1.1.2) (2022-02-28)


### Bug Fixes

* fix running subcommands other than `init, dev, build` ([0094010](https://github.com/amrbashir/vite-plugin-tauri/commit/009401058c1df2b7ae1e4e2e1a28aacc5310f080))
* prevent `init` subcommand also running `dev` ([c31e1a5](https://github.com/amrbashir/vite-plugin-tauri/commit/c31e1a5982af841ca17da9f94b160518b6fc7e0d))
* resolve vite outDir before passing to tauri cli ([99f648d](https://github.com/amrbashir/vite-plugin-tauri/commit/99f648d3005b5c5e805aacdd3e0f98649a3261d2))



## [1.1.1](https://github.com/amrbashir/vite-plugin-tauri/compare/v1.1.0...v1.1.1) (2022-02-21)


### Bug Fixes

* fix `ERROR_MODULE_NOT_FOUND` due to wrong import, fix [#2](https://github.com/amrbashir/vite-plugin-tauri/issues/2) ([a0efed5](https://github.com/amrbashir/vite-plugin-tauri/commit/a0efed5659ac5e0690d0dba5401295b7eb5c0f72))



# [1.1.0](https://github.com/amrbashir/vite-plugin-tauri/compare/v1.0.0...v1.1.0) (2022-02-14)


### Features

* use `TAURI_PATH_DEPTH` env if it exists ([b5224fb](https://github.com/amrbashir/vite-plugin-tauri/commit/b5224fb48b0d96f034f8a13d5829e7c307ae2bf4))



# [1.0.0](https://github.com/amrbashir/vite-plugin-tauri/compare/v0.1.12...v1.0.0) (2022-02-12)


### Features

* use `@tauri-apps/cli` as a peerDeppendency ([ad1bbf4](https://github.com/amrbashir/vite-plugin-tauri/commit/ad1bbf47bf8c2f9b15bf51c09c16d05b7471013c))



## [0.1.12](https://github.com/amrbashir/vite-plugin-tauri/compare/v0.1.11...v0.1.12) (2022-01-12)


### Bug Fixes

* use a relative path when building, fixes [#1](https://github.com/amrbashir/vite-plugin-tauri/issues/1) ([63a2f88](https://github.com/amrbashir/vite-plugin-tauri/commit/63a2f88b985513c919b6cdf464d8bbfa33d420cd))



## 0.1.11 (2022-01-11)


### Bug Fixes

* pass vite `outDir` directly to tauri-cli, fixes [#1](https://github.com/amrbashir/vite-plugin-tauri/issues/1) ([7d0fe4c](https://github.com/amrbashir/vite-plugin-tauri/commit/7d0fe4c1c2923919beb8236eac78b920ffab0ce5))



## 0.1.10 (2021-12-12)


### Bug Fixes

* print stdout from tauri correctly ([85ed5dd](https://github.com/amrbashir/vite-plugin-tauri/commit/85ed5dd17777521aab718e6f1923c751055ff69a))



## 0.1.9 (2021-12-06)


### Misc.
* upadte `LICENSE.md`


## 0.1.8 (2021-12-03)


### Bug Fixes

* show correct cli name in help message


## 0.1.7 (2021-12-02)


### Bug Fixes

* use node12 compatible api to remove corrupted downloads


## 0.1.6 (2021-11-08)


### Bug Fixes

* correctly construct window title upon initialization
* print tauri help message when a subcommand isn't passed


## 0.1.5 (2021-10-31)


### Bug Fixes

* fix crash upon running the cli without passing a subcommand

## 0.1.4 (2021-10-30)


### Bug Fixes

* lower needed NodeJs version to `>=12.20`
* pass cli arguments to tauri cli in dev/build
* update node engine to `^12.20.0 || ^14.13.1 || >=16.0.0`


## 0.1.3 (2021-09-02)


### Bug Fixes

* append version to downloaded cli
* use correct tauri cli command for `vite-tauri build`


## 0.1.2 (2021-08-27)


### Bug Fixes

* fix `Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'stream'`


## 0.1.1 (2021-08-27)


### Bug Fixes

* update required node version


## 0.1.0 (2021-08-27)


### Features

* add support for all tauri cli commands and flags



