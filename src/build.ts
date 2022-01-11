import { resolveConfig, build as viteBuild } from "vite";
import { initTauri, isTauriProject } from "./utils";
import { runOnCli } from "./tauri-cli";
import { logger } from "./logger";

export async function build(args?: string[]): Promise<void> {
  if (!isTauriProject()) {
    await initTauri();
  }
  logger.info(`Building Vite project...`);
  await viteBuild();
  logger.info(`Vite build finished.`);
  logger.info(`Building Tauri app...`);
  await runOnCli(
    "build",
    {
      config: {
        build: {
          distDir: (
            await resolveConfig({}, "build", "production")
          ).build.outDir,
        },
      },
    },
    args
  );
  logger.info(`Tauri build finished.`);
}
