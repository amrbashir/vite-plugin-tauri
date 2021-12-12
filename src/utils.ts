import { existsSync, readFileSync } from "fs";
import { runOnCli } from "./tauri-cli";
import { promisify } from "util";
import { createWriteStream, unlinkSync } from "fs";
import got from "got";
import stream from "stream";
import { logger } from "./logger";
const pipeline = promisify(stream.pipeline);

export const isProduction = process.env.NODE_ENV === "production";

const DOWNLOADS: {
  [url: string]: {
    downloading?: boolean;
    loggedFailure?: boolean;
  };
} = {};
export async function downloadFile(
  url: string,
  outPath: string
): Promise<void> {
  const fileName = url.slice(url.lastIndexOf("/") + 1);

  const removeIncompleteDownload = () => {
    const { downloading, loggedFailure } = DOWNLOADS[url];
    if (downloading) {
      if (!loggedFailure) logger.error(`${fileName} download interrupted!`);
      unlinkSync(outPath);
      if (!loggedFailure) logger.error("Stopping process...");
      DOWNLOADS[url].loggedFailure = true;
      DOWNLOADS[url].downloading = false;
      process.exit(1);
    }
  };
  process.on("exit", removeIncompleteDownload);
  process.on("SIGINT", removeIncompleteDownload);
  process.on("SIGTERM", removeIncompleteDownload);
  process.on("SIGHUP", removeIncompleteDownload);
  process.on("SIGBREAK", removeIncompleteDownload);

  logger.info(`Downloading ${fileName} to ${outPath}...`);
  DOWNLOADS[url] = {};
  DOWNLOADS[url].downloading = true;

  await pipeline(got.stream(url), createWriteStream(outPath)).catch((e) => {
    try {
      logger.error(`${fileName} download failed!`);
      unlinkSync(outPath);
    } catch {
      throw e;
    }
  });
  DOWNLOADS[url].downloading = false;
  logger.info(`${fileName} download Completed.`);
}

export function toKebabCase(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export function isTauriProject(): boolean {
  return existsSync("src-tauri");
}

export async function initTauri(): Promise<void> {
  logger.info("Initializing Tauri...");
  const pkg = getPackageJson();
  await runOnCli("init", {
    appName: pkg.name ?? "tauri-app",
    windowTitle: (pkg.name ?? "tauri-app") + " window",
    distDir: "Injected by vite-plugin-tauri",
    devPath: "Injected by vite-plugin-tauri",
  });
  logger.info("Tauri initialized.");
}

function getPackageJson(): { name: string } {
  return JSON.parse(readFileSync("package.json", "utf8"));
}
