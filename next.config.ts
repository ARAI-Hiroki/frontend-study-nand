import type { NextConfig } from 'next'
const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',

  basePath: isProd ? '/frontend-study-nand' : '',
  assetPrefix: isProd ? '/frontend-study-nand/' : '',

  images: {
    unoptimized: true
  }
}

export default nextConfig
