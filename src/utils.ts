import { readFileSync } from "node:fs";

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
