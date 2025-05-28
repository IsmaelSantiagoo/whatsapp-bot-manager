import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "pps.whatsapp.net"
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com"
      },
    ],
  },
};

export default nextConfig;
