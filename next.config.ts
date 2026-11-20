import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/downloads/index.html", headers: [{ key: "Content-Disposition", value: 'attachment; filename="index.html"' }] },
      { source: "/downloads/forma-github-pages.zip", headers: [{ key: "Content-Disposition", value: 'attachment; filename="forma-github-pages.zip"' }] },
    ];
  },
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/index.html" }], afterFiles: [], fallback: [] };
  },
};

export default nextConfig;
