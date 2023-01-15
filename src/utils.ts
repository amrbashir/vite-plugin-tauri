import { readFileSync } from "node:fs";
import TauriCli from "@tauri-apps/cli";
import fg from "fast-glob";

export function getTauriConfPath(): string | null {
  const tauriDepthEnv = process.env.TAURI_PATH_DEPTH;
  const deep = tauriDepthEnv ? parseInt(tauriDepthEnv) : 3;

  return fg.sync("**/(tauri.conf.(json|json5)|Tauri.toml)", {
    absolute: true,
    unique: true,
    ignore: ["node_modules/**", "target/**"],
    deep,
  })[0];
}

export function getPackageJson(): { name: string } {
  return JSON.parse(readFileSync("package.json", "utf8"));
}

const GREEN = "\x1b[32m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

export function confirm(msg: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const question = `${GREEN}? ${RESET}${BOLD}${msg}${RESET} ${DIM}(Y/n)${RESET}`;
    process.stdout.write(question);
    process.stdin.setRawMode(true);
    process.stdin.once("data", (data) => {
      process.stdout.write(data.toString());
      process.stdout.write("\n");
      process.stdin.setRawMode(false);
      const key = data.toString();
      if (key === "y" || key === "Y") {
        resolve(true);
      } else if (key === "n" || key === "N") {
        resolve(false);
      } else {
        process.exit(1);
      }
    });
  });
}

export async function initTauri(args?: string[]) {
  const confirmed = await confirm(
    "Couldn't find a Tauri project in current directory, would you like to initialize a new one?"
  );

  if (!confirmed) process.exit(0);

  console.log("Initializing Tauri...");
  const pkgName = getPackageJson().name;
  await TauriCli.run(
    [
      "init",
      "--app-name",
      pkgName ?? "tauri-app",
      "--window-title",
      (pkgName ?? "tauri-app") + " window",
      "--dist-dir",
      `Injected by vite-plugin-tauri, you can change this if you want to use tauri cli directly`,
      "--dev-path",
      `Injected by vite-plugin-tauri, you can change this if you want to use tauri cli directly`,
      "--before-build-command",
      "",
      "--before-dev-command",
      "",
      ...(args ?? []),
    ],
    "vite-tauri"
  );
  console.log("Tauri initialized.");
}
