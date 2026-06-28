import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> served by Nginx from /var/www/dannywallet (no Node runtime).
  output: "export",
  // Required for static export (no image optimization server).
  images: { unoptimized: true },
  // Emit /webwallet/index.html (clean URLs) so Nginx try_files resolves it.
  trailingSlash: true,
};

export default nextConfig;
