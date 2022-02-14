import { createServer } from "vite";
import { getTauriConfPath } from "./utils";
import { logger } from "./logger";
import { init } from "./init";
import TauriCli from "@tauri-apps/cli";

export async function dev(args?: string[]) {
  if (!getTauriConfPath()) init([], true);

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
  await TauriCli.run(
    [
      "dev",
      "--config",
      JSON.stringify({
        build: {
          devPath: `http://localhost:${server.config.server.port}`,
        },
      }),
      ...(args ?? []),
    ],
    "vite-tauri"
  );

  await server.close();
}
