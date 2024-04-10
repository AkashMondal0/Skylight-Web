const _configs = {
    serverApi: {
        baseUrl: process.env.SERVER_API_URL
    },
    supabase: {
        bucketUrl: process.env.SUPABASE_BUCKET_URL,
        clientKey: process.env.SUPABASE_CLIENT_KEY,
        clientUrl: process.env.SUPABASE_CLIENT
    }
}

export const configs = Object.freeze(_configs)