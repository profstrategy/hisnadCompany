import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },

  webpack: (config) => {
    config.externals = [...config.externals, '@prisma/client']
    return config
  }

};

export default nextConfig;
