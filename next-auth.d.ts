import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
    interface User extends DefaultUser {
        id: string;
        username: string;
        email: string;
        name: string;
    }
    interface Session {
        user?: {
            id: string;
            username: string;
            email: string;
            name: string;
        } & DefaultSession['user'];
    }
}