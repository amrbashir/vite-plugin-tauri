import { readFileSync } from "node:fs";
import fg from "fast-glob";

export function getTauriConfPath(): string | null {
  return fg.sync("**/tauri.conf.(json|json5)", {
    absolute: true,
    unique: true,
    ignore: ["node_modules/**", "target/**"],
    deep: 5,
  })[0];
}

export function getPackageJson(): { name: string } {
  return JSON.parse(readFileSync("package.json", "utf8"));
}
