/** Configuration object for vite-plugin-tauri */
export interface ViteTauriPluginConfig {
  /** Enable or disable building Tauri in debug mode. Defaults to `undefined` which means it will be in `debug` mode for `development` and in `release` mode for `production` */
  debug?: boolean;
  /**
   * Specify the rust target to build. Defaults to the target of the currently active toolchain
   *
   * @see https://doc.rust-lang.org/nightly/rustc/platform-support.html for full list of targets
   */
  target?: string;
}
