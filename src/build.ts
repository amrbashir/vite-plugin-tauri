import { resolveConfig, build as viteBuild } from "vite";
import { getTauriConfPath } from "./utils";
import { logger } from "./logger";
import { relative, dirname } from "node:path";
import TauriCli from "@tauri-apps/cli";
import { init } from "./init";

export async function build(args?: string[]) {
  let tauriConfPath = getTauriConfPath();
  if (!tauriConfPath) {
    init([], true);
    tauriConfPath = getTauriConfPath();
  }

  logger.info(`Building Vite project...`);
  await viteBuild();
  logger.info(`Vite build finished.`);

  logger.info(`Building Tauri app...`);
  TauriCli.run(
    [
      "build",
      "--config",
      JSON.stringify({
        build: {
          distDir: relative(
            // at this point, `tauriConfPath` can't be null,
            // because we made sure to initialize tauri if it weren't and got the new path.
            dirname(tauriConfPath as string),
            (await resolveConfig({}, "build", "production")).build.outDir
          ),
        },
      }),

      ...(args ?? []),
    ],
    "vite-tauri"
  );
  logger.info(`Tauri build finished.`);
}
