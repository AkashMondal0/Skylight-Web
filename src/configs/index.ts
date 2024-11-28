const _configs = {
    appUrl: "https://sky-light.vercel.app",
    cookieName: "skylight-token",

    serverApi: {
        baseUrl: process.env.SERVER_API_URL,
        // 
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
        supabaseStorageUrl: process.env.SUPABASE_STORAGE_URL,
        // 
        aiApiUrl: process.env.AI_API_URL,
    },
    AppDetails: {
        version: "1.0.0",
        name: "Skylight",
        description:
            "SkyLight is a social media platform that allows users to share their thoughts and ideas with the world.",
        appUrl: process.env.NEXTAUTH_URL ?? "https://skysolo.me",
        logoUrl: "/primary-logo.png",
        primaryLightLogo: "/primary-light-logo.jpeg",
        creator: "@AkashMondal",
        category: "social media",
    },
};

export const configs = Object.freeze(_configs);
