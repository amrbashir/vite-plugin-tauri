import { readFileSync } from "node:fs";
import { green, bold, gray, reset } from "kolorist";
import readline from "readline";
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

export function confirm(msg: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const question = `${green("?")} ${bold(msg)} ${gray("(Y/n)")} `;
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
