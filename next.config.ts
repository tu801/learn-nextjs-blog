import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "bairesdev.mo.cloudinary.net"],
  },
};

export default nextConfig;
