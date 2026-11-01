import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const onGitHubPages = process.env["GITHUB_PAGES"] === "true";
const basePath = onGitHubPages ? "/bedy-misiones" : "";

export default defineConfig({
  vite: {
    base: basePath ? `${basePath}/` : "/",
  },
  tanstackStart: {
    server: { entry: "server" },
    router: { basepath: basePath || undefined },
    prerender: onGitHubPages ? { enabled: true, crawlLinks: true } : undefined,
  },
  ...(onGitHubPages ? { nitro: false } : {}),
});
