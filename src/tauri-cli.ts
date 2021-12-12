import { downloadFile, isProduction, toKebabCase } from "./utils";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { chmodSync, existsSync } from "fs";
import { spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const extension = process.platform === "win32" ? ".exe" : "";
const tagName = "tauri-cli-v1.0.0-beta.7";
const TAURI_CLI_PATH = join(
  __dirname,
  isProduction ? "" : "..",
  `${tagName}${extension}`
);

export async function runOnCli(
  command: string,
  objectArgs?: Partial<
    Record<
      "config" | "appName" | "windowTitle" | "distDir" | "devPath",
      string | boolean | number | unknown
    >
  >,
  arrayArgs?: string[]
): Promise<void> {
  if (!existsSync(TAURI_CLI_PATH)) await downloadTauriCli();

  // parse `objectArgs` into a list of kebab-case arguments
  const args: string[] = [];
  for (const [argName, argValue] of Object.entries(objectArgs ?? {})) {
    if (argValue === false) continue;

    args.push(`--${toKebabCase(argName)}`);
    if (argValue === true) continue;

    args.push(
      typeof argValue === "string" ? argValue : JSON.stringify(argValue)
    );
  }

  return new Promise<void>((resolve, reject) => {
    const child = spawn(
      TAURI_CLI_PATH,
      ["tauri", command, ...args, ...(arrayArgs ?? [])],
      {
        cwd: process.cwd(),
        stdio: ["inherit", "pipe", "inherit"],
      }
    );
    child.stdout.on("data", (data) => {
      console.log(
        command === "help"
          ? data.toString().replace("cargo tauri", "vite-tauri")
          : data
      );
    });

    child
      .on("close", () => {
        resolve();
      })
      .on("error", () => {
        reject();
      });
  });
}

async function downloadTauriCli(): Promise<void> {
  let platform = "";
  switch (process.platform) {
    case "win32":
      platform = "windows";
      break;
    case "linux":
      platform = "linux";
      break;
    case "darwin":
      platform = "macos";
      break;
    default:
      throw Error("Unsupported tauri-cli platform");
  }
  const url = `https://github.com/tauri-apps/binary-releases/releases/download/${tagName}/tauri-cli_${platform}${extension}`;
  await downloadFile(url, TAURI_CLI_PATH);
  chmodSync(TAURI_CLI_PATH, 0o700);
}
