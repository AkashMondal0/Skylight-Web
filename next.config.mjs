/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    images: {
        formats: ["image/avif", "image/webp"],
        // domains: ["nngujjeumggzpchjxdpn.supabase.co"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nngujjeumggzpchjxdpn.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/skymedia/**',
            },
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
        DATABASE_URL: process.env.DATABASE_URL,
        // NextAuth
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        AUTH_DRIZZLE_URL: process.env.AUTH_DRIZZLE_URL,
        // OAuth
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        // Supabase
        SUPABASE_CLIENT: process.env.SUPABASE_CLIENT,
        SUPABASE_CLIENT_KEY: process.env.SUPABASE_CLIENT_KEY,
        SUPABASE_BUCKET_URL: process.env.SUPABASE_BUCKET_URL,
        // firebase
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
    }
};

export default nextConfig;
