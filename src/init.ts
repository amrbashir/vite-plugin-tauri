import { logger } from "./logger";
import { confirm, getPackageJson } from "./utils";
import TauriCli from "@tauri-apps/cli";

export async function init(args?: string[], promptUser = false) {
  if (promptUser) {
    const confirmed = await confirm(
      "Couldn't find a Tauri project in current directory, would you like to initialize a new one?"
    );

    if (!confirmed) process.exit(0);
  }

  logger.info("Initializing Tauri...");
  const pkgName = getPackageJson().name;
  await TauriCli.run(
    [
      "init",
      "--app-name",
      pkgName ?? "tauri-app",
      "--window-title",
      (pkgName ?? "tauri-app") + " window",
      "--dist-dir",
      "Injected by vite-plugin-tauri",
      "--dev-path",
      "Injected by vite-plugin-tauri",
      ...(args ?? []),
    ],
    "vite-tauri"
  );
  logger.info("Tauri initialized.");
}
