import type { NextConfig } from "next";

// On GitHub Pages the site is served from a sub-path (/DAN-wallet-web).
// The VPS build (dannywallet.com) serves from root, so basePath stays empty there.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/DAN-wallet-web" : "";

const nextConfig: NextConfig = {
  // Static HTML export -> served by Nginx from /var/www/dannywallet (no Node runtime).
  output: "export",
  // Required for static export (no image optimization server).
  images: { unoptimized: true },
  // Emit /webwallet/index.html (clean URLs) so Nginx try_files resolves it.
  trailingSlash: true,
  // Sub-path config for GitHub Pages (no-op on the VPS build).
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // Exposed to the client so raw <img src> can honor the base path.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
