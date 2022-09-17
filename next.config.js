/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.RANDOM_USER_DOMAIN_URL || "randomuser.me"],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    APP_NAME: 'Meet The Team',
    API: '/api',
    PRODUCTION: process.env.PRODUCTION ||false,
    DOMAIN: 'http://localhost:3000',
    RANDOM_USER_API_URL: process.env.RANDOM_USER_API_URL || 'https://randomuser.me/api',
  },
  reactStrictMode: true,
  swcMinify: true,
  
}

module.exports = nextConfig
