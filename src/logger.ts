import { cyan, lightRed, reset, bold } from "kolorist";

export const logger = {
  info: (msg: string): void => {
    console.log(
      `${getCurrentTime()} ${bold(cyan("[vite-plugin-tauri]"))} `,
      reset(msg)
    );
  },
  error: (msg: string): void => {
    console.error(
      `${getCurrentTime()} ${bold(lightRed("[vite-plugin-tauri]"))} `,
      reset(msg)
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
