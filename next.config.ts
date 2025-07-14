import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "g5be1ue6ob.ufs.sh",
      },
    ]
  },
};

export default nextConfig;
