import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/server.ts",
  platform: "node",
  // Keep node builtins and node_modules deps external; bundle only our own
  // source. pino-pretty uses worker threads / dynamic requires that break when
  // inlined, so deps stay resolved from node_modules at runtime.
  external: [/^[^./]/],
  output: {
    dir: "dist",
    format: "esm",
    minify: true,
  },
});
