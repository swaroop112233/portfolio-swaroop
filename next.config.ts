import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["*.ngrok-free.dev", "*.ngrok.io", "*.ngrok-free.app"],
};

export default nextConfig;
