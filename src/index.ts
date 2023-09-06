import { Plugin, ResolvedConfig } from "vite";
import { confirm, getPackageJson } from "./utils";
import { ViteTauriPluginConfig } from "./config";
import TauriCli from "@tauri-apps/cli";
import path, { dirname } from "path";
import fg from "fast-glob";

export function getTauriConfPath(): string | null {
  const tauriDepthEnv = process.env.TAURI_PATH_DEPTH;
  const deep = tauriDepthEnv ? parseInt(tauriDepthEnv) : 3;

  return fg.sync("**/(tauri.conf.(json|json5)|Tauri.toml)", {
    absolute: true,
    unique: true,
    ignore: ["**/node_modules/**", "**/target/**"],
    deep,
  })[0];
}

async function initTauri(args?: string[]) {
  const confirmed = await confirm(
    "Couldn't find a Tauri project in current directory, would you like to initialize a new one?",
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
    "vite-tauri",
  );
  console.log("Tauri initialized.");
}

export function tauri(config?: ViteTauriPluginConfig): Plugin[] {
  let viteConfig: ResolvedConfig;
  return [
    {
      name: "vite-plugin-tauri:serve",
      apply: "serve",
      enforce: "post",
      configResolved(config) {
        viteConfig = config;
      },
      async configureServer(server) {
        if (!getTauriConfPath()) await initTauri();

        server.httpServer?.once("listening", () => {
          const localhosts = [
            "localhost",
            "127.0.0.1",
            "::1",
            "0000:0000:0000:0000:0000:0000:0000:0001",
          ];

          const address = server.httpServer?.address();
          if (!address || typeof address === "string") {
            console.error("Unexpected dev server address", address);
            process.exit(1);
          }

          const protocol = server.config.server.https ? "https" : "http";
          const host = localhosts.includes(address.address)
            ? "localhost"
            : address.address;
          const port = address.port;

          const args = [
            "dev",
            "--config",
            JSON.stringify({
              build: {
                devPath: `${protocol}://${host}:${port}`,
              },
            }),
          ];

          if (config?.debug !== undefined && !config.debug)
            args.push("--release");
          if (config?.target) args.push("--target", config.target);
          if (config?.verbose) args.push("--verbose");

          TauriCli.run(args, "vite-plugin-tauri");
        });
      },
    },
    {
      name: "vite-plugin-tauri:build",
      apply: "build",
      enforce: "post",
      configResolved(config) {
        viteConfig = config;
      },
      async closeBundle() {
        let tauriConfPath = getTauriConfPath();
        if (!tauriConfPath) {
          await initTauri();
          tauriConfPath = getTauriConfPath();
        }

        const args = [
          "build",
          "--config",
          JSON.stringify({
            build: {
              // at this point, `tauriConfPath` can't be null
              distDir: path.relative(
                dirname(tauriConfPath!),
                path.resolve(viteConfig.build.outDir),
              ),
            },
          }),
        ];

        if (config?.debug) args.push("--debug");
        if (config?.target) args.push("--target", config.target);
        if (config?.verbose) args.push("--verbose");

        await TauriCli.run(args, "vite-plugin-tauri");
      },
    },
  ];
}

export default tauri;
