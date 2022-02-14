#!/usr/bin/env node

import { build } from "./build";
import { dev } from "./dev";
import { logger } from "./logger";
import { init } from "./init";
import TauriCli from "@tauri-apps/cli";

async function run() {
  const cmd = process.argv[2];
  const args = process.argv.slice(3);
  switch (cmd) {
    case "init":
      init(args);
    case "dev":
      await dev(args);
      break;
    case "build":
      await build(args);
      break;
    default:
      await TauriCli.run([cmd ?? "help", ...args, "vite-tauri"], "vite-tauri");
  }
}

run().catch((e) => logger.error(e));
