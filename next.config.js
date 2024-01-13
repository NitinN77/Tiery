/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '9002'
            },
            {
                protocol: 'https',
                hostname: 's3.ap-south-1.amazonaws.com',
                port: ''
            }
        ]
    }
}

module.exports = nextConfig
