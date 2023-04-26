/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  outputStandalone: true,
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
