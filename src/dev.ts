import { createServer } from "vite";
import { initTauri, isTauriProject } from "./utils";
import { runOnCli } from "./tauri-cli";
import { logger } from "./logger";

export async function dev(args?: string[]): Promise<void> {
  if (!isTauriProject()) {
    await initTauri();
  }
  logger.info("Starting Vite dev server...");
  const server = await createServer({
    clearScreen: false,
    server: {
      open: false,
    },
  });
  await server.listen();
  logger.info("Vite dev server started.");
  logger.info("Starting Tauri...");
  await runOnCli(
    "dev",
    {
      config: {
        build: {
          devPath: `http://localhost:${server.config.server.port}`,
        },
      },
    },
    args
  );
  await server.close();
}
