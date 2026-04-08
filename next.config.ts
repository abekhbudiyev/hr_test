import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hr_test",
  assetPrefix: "/hr_test/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
