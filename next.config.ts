import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/dirtypicks",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  trailingSlash: true
};

export default nextConfig;
