interface Post {
    id: string
    fileUrl: string[]
    commentCount: number
    likeCount: number
    createdAt: Date | string
    comments: Comment[]
    likes: AuthorData[]
    isDummy?: boolean
    content: string;
    title: string;
    updatedAt?: Date;
    is_Liked: boolean;
    user: AuthorData;
}

interface AuthorData {
    id: string
    username: string
    email: string
    name: string
    profilePicture?: string
    followed_by?: boolean
    following?: boolean
}
enum Role {
    User = 'user',
    Admin = 'admin',
}
type User = {
    id: string;
    username: string;
    name: string;
    email: string;
    password?: string; // Password might not be returned
    profilePicture: string | null;
    bio: string | null;
    createdAt?: Date | string | null | unknown;
    updatedAt?: Date | string | null | unknown;
    isVerified?: boolean | false | null;
    isPrivate?: boolean | false | null;
    accessToken?: string | null | unknown;
    refreshToken?: string | null | unknown;
    loggedDevice?: any[] | unknown;
    roles?: Role[] | string[];
    salt?: string;
    friendship: {
        followed_by: boolean; // if the user is followed by the following
        following: boolean; // if the user is following the following
    }
    postCount: number;
    followerCount: number;
    followingCount: number;
}

enum FriendshipStatus {
    // 'pending', 'accepted', 'rejected', 'blocked', 'deleted'
    Pending = 'pending',
    Accepted = 'accepted',
    Rejected = 'rejected',
    Blocked = 'blocked',
    Deleted = 'deleted',
}
type Friendship = {
    id?: string;
    followingUsername?: string;
    authorUsername?: string;
    followingUserId?: string;
    authorUserId?: string;
    createdAt?: Date | string | unknown;
    updatedAt?: Date | string | unknown;
    status?: FriendshipStatus | string;
}

interface Message {
    id: string;
    content: string;
    fileUrl: string[];
    authorId: string;
    deleted: boolean;
    seenBy: string[];
    conversationId: string;
    createdAt: Date;
    updatedAt: Date;
    user?: AuthorData | null;
}

interface Conversation {
    id: string;
    members?: string[];
    authorId: string;
    messages: Message[]
    user?: AuthorData | null
    isGroup: boolean | null;
    lastMessageContent: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    groupName?: string | null;
    groupImage?: string | null;
    groupDescription?: string | null;
}

interface Comment {
    id: string;
    content: string;
    authorId: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
    user: AuthorData
}

type Assets = {
    id?: string,
    url?: string,
    type?: 'image' | 'video' | 'audio' | "text"
    caption?: string;
}

type findDataInput = {
    username?: string
    id?: string
    offset: number
    limit: number
}

type GraphqlError = {
    message: string
    locations: {
        line: number
        column: number
    }[]
    path: string[]
    extensions: {
        code: string
        originalError: {
            message: string
            statusCode: number
        }
        stacktrace: string[]
    }
}

type Typing = {
    typing: boolean
    authorId: string
    members: string[]
    conversationId: string
    isGroup: boolean
    groupUser?: AuthorData
}

export type {
    User,
    Message,
    Conversation,
    Post,
    Comment,
    AuthorData,
    Assets,
    Friendship,
    Role,
    FriendshipStatus,
    findDataInput,
    GraphqlError,
    Typing
}