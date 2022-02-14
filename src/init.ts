import { logger } from "./logger";
import { getPackageJson } from "./utils";
import enquirer from "enquirer";
import TauriCli from "@tauri-apps/cli/main";

export async function init(args?: string[], promptUser = false) {
  if (promptUser) {
    const { confirmed } = await enquirer.prompt<{ confirmed: boolean }>({
      type: "confirm",
      name: "confirmed",
      message:
        "Couldn't recognize the current directory as a Tauri project, would you like to initialize Tauri?",
    });

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
