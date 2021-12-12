import chalk from "chalk";

export const logger = {
  info: (...args: string[]): void => {
    console.log(
      `${getCurrentTime()} ${chalk.bold.cyan("[vite-plugin-tauri]")} `,
      chalk.reset(args)
    );
  },
  error: (...args: string[]): void => {
    console.error(
      `${getCurrentTime()} ${chalk.bold.redBright("[vite-plugin-tauri]")} `,
      chalk.reset(args)
    );
  },
};

function getCurrentTime(): string {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 ? hours : 12}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds} ${ampm}`;
}
