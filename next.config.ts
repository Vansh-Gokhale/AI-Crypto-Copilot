import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.16.41.150", "localhost"],
  turbopack: {},
};

export default nextConfig;
