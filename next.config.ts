import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '804e39kyw6.ufs.sh',
      }
    ],
  },

  webpack: (config) => {
    config.externals = [...config.externals, '@prisma/client']
    return config
  }

};

export default nextConfig;
