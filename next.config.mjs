/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    images: {
        unoptimized: true,
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/seed/**',
            },
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                port: '',
                pathname: '/random/**',
            }, {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: `/v0/b/${process.env.STORAGE_BUCKET}/o/**`,
            }
        ],
    },
    env: {
        // API
        SERVER_API_URL: process.env.SERVER_API_URL,
        // NextAuth
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        // firebase
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
    }
};

export default nextConfig;