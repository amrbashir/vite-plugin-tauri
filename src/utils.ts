import { readFileSync } from "node:fs";
import fg from "fast-glob";

export function getTauriConfPath(): string | null {
  const tauriDepthEnv = process.env.TAURI_PATH_DEPTH;
  const deep = tauriDepthEnv ? parseInt(tauriDepthEnv) : 3;

  return fg.sync("**/tauri.conf.(json|json5)", {
    absolute: true,
    unique: true,
    ignore: ["node_modules/**", "target/**"],
    deep,
  })[0];
}

export function getPackageJson(): { name: string } {
  return JSON.parse(readFileSync("package.json", "utf8"));
}
