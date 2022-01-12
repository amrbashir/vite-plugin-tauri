import { resolveConfig, build as viteBuild } from "vite";
import { initTauri, isTauriProject } from "./utils";
import { runOnCli } from "./tauri-cli";
import { logger } from "./logger";
import { relative, join, dirname } from "path";
import { findUp } from "find-up";

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
          distDir: relative(
            join(
              dirname(
                (await findUp("package.json")) ?? process.cwd() + "package.json"
              ),
              "src-tauri"
            ),
            (
              await resolveConfig({}, "build", "production")
            ).build.outDir
          ),
        },
      },
    },
    args
  );
  logger.info(`Tauri build finished.`);
}
