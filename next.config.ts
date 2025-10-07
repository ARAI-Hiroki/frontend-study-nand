import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   output: 'export',

  basePath: '/frontend-study-nand', 
  assetPrefix: '/frontend-study-nand/',
  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
