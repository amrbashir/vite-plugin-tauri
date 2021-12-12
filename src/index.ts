#!/usr/bin/env node

import { build } from "./build";
import { dev } from "./dev";
import { runOnCli } from "./tauri-cli";
import { logger } from "./logger";

async function run(): Promise<void> {
  const cmd = process.argv[2];
  const args = process.argv.slice(3);
  switch (cmd) {
    case "build":
      await build(args);
      break;
    case "dev":
      await dev(args);
      break;
    default:
      await runOnCli(cmd ?? "help", {}, args);
  }
}

run().catch((e) => logger.error(e));
