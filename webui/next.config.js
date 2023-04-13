/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    // Value is the same for all requests
    treatedPathParams: ['id']
},
publicRuntimeConfig: {
    // Will be available on both server and client side
    // Value is the same for all requests
    treatedPathParams: ['id']
}
}

module.exports = nextConfig
