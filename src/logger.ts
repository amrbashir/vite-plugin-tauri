import { bold, cyan, lightRed, reset } from "kolorist";

export const logger = {
  info: (msg: string) => {
    console.log(`${bold(cyan("[vite-plugin-tauri]"))} `, reset(msg));
  },
  error: (msg: string) => {
    console.error(`${bold(lightRed("[vite-plugin-tauri]"))} `, reset(msg));
  },
};
