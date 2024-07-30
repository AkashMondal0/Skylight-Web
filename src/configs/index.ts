
const _configs = {
    appUrl: process.env.NEXTAUTH_URL,
    serverApi: {
        baseUrl: process.env.SERVER_API_URL,
    },
    firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    },
    AppDetails: {
        name: process.env.APP_NAME || "Skylight",
        description: process.env.APP_DESCRIPTION || "SkyLight is a social media platform that allows users to share their thoughts and ideas with the world.",
        version: process.env.APP_VERSION || "1.0.0",
        logoUrl: process.env.APP_LOGO_URL || "/skylight_logo.png",
    }
}

export const configs = Object.freeze(_configs)