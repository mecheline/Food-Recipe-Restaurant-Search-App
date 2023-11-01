/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["edamam-product-images.s3.amazonaws.com"],
  },
  
};

module.exports = nextConfig;
