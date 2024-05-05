const _configs = {
    appUrl: process.env.NEXTAUTH_URL,
    serverApi: {
        baseUrl: process.env.SERVER_API_URL,
        dataBaseUrl: process.env.DATABASE_URL,
    },
    supabase: {
        bucketUrl: process.env.SUPABASE_BUCKET_URL,
        clientKey: process.env.SUPABASE_CLIENT_KEY,
        clientUrl: process.env.SUPABASE_CLIENT
    }
}

export const configs = Object.freeze(_configs)