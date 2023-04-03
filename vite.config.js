import { resolve } from "path";

export default {
  root: "client/",
  envDir: "../",
  publicDir: "../public",

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "client/index.html"),
        nested: resolve(__dirname, "client/debug.html"),
      },
    },
  },
};
