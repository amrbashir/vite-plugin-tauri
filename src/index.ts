import { Plugin, ResolvedConfig } from "vite";
import { getTauriConfPath, initTauri } from "./utils";
import TauriCli from "@tauri-apps/cli";
import path, { dirname } from "path";
import { ViteTauriPluginConfig } from "./config";

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

          TauriCli.run(
            [
              "dev",
              "--config",
              JSON.stringify({
                build: {
                  devPath: `${protocol}://${host}:${port}`,
                },
              }),
              ...(config?.debug === true ? [] : ["--release"]),
              ...(config?.target ? ["--target", config.target] : []),
            ],
            "vite-plugin-tauri"
          );
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

        await TauriCli.run(
          [
            "build",
            "--config",
            JSON.stringify({
              build: {
                // at this point, `tauriConfPath` can't be null
                distDir: path.relative(
                  dirname(tauriConfPath!),
                  path.resolve(viteConfig.build.outDir)
                ),
              },
            }),
            ...(config?.debug ? ["--debug"] : []),
            ...(config?.target ? ["--target", config.target] : []),
          ],
          "vite-plugin-tauri"
        );
      },
    },
  ];
}

export default tauri;
