import type { NextConfig } from "next"

// Static export for GitHub Pages. `output: 'export'` builds the demo site
// to ./out/ as plain HTML/JS — no server runtime. The /public/r/*.json
// registry files are copied into ./out/r/ at the same time, so consumers
// can `npx shadcn add <pages-url>/r/<name>.json` against the deployed site.
//
// GH Pages project sites live at https://<user>.github.io/<repo>/. Next.js
// needs basePath = "/<repo>" so that all asset URLs include it. The GH
// Actions workflow sets NEXT_PUBLIC_REGISTRY_URL to the full Pages URL;
// we derive basePath from its path component. Empty env (= local dev or
// user/org GH Pages root) → basePath is "".
const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL
const basePath = registryUrl
  ? new URL(registryUrl).pathname.replace(/\/$/, "")
  : ""

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
