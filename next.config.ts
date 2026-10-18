import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site on GitHub Pages (raisetalks.com): `next build` writes plain HTML to /out.
  output: "export",
  // Every page is a folder (/about/index.html), as on the old site, so existing links and indexed
  // URLs keep resolving (GitHub Pages redirects /about to /about/).
  trailingSlash: true,
  images: {
    // Serve /images/** exactly as supplied (designer decision: no re-compression, no /_next/image)
    unoptimized: true,
    // YouTube thumbnails (Startups video poster): https://i.ytimg.com/vi/<id>/maxresdefault.jpg
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
