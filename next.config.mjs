// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Make sure you're *not* enabling the appDir here, e.g., no experimental: { appDir: true }
};

export default nextConfig;