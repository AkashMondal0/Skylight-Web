interface FeedPost {
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
    updatedAt: Date;
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
    fileUrl: Assets[];
    authorId: string;
    deleted: boolean;
    seenBy: string[];
    conversationId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Conversation {
    id: string;
    members: string[];
    isGroup: boolean;
    groupName: string | null;
    groupImage: string | null;
    groupDescription: string | null;
    authorId: string;
    createdAt: Date;
    updatedAt: Date | string;
    messages: Message[];
    membersData: AuthorData[]
    lastMessageContent: string
}

interface Post {
    id: string;
    caption: string;
    fileUrl: string[];
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Comment {
    id: string;
    comment: string;
    authorId: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
    authorData: AuthorData
}

interface Like {
    id: string;
    authorId: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
    authorData: AuthorData
}

interface Follower {
    id: string;
    followerUserId: string;
    followingUserId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Notification {
    id: string;
    content: string;
    authorId: string;
    receiverId: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
}
interface Story {
    id: string;
    fileUrl: string[];
    caption: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface StoryView {
    id: string;
    viewerId: string;
    storyId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface StoryReply {
    id: string;
    content: string;
    authorId: string;
    storyId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface StoryLike {
    id: string;
    authorId: string;
    storyId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface SavedPost {
    id: string;
    postId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

type code = 0 | 1
interface ApiPayloadData<T> {
    code: code,
    message: string,
    data: T,
}

interface RestApiPayload<T> {
    code: number,
    message: string,
    data: T,
    status_code: number
}

type networkImage_status = "error" | "loading" | "success"

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

export type {
    User,
    Message,
    Conversation,
    Post,
    Comment,
    Like,
    Follower,
    Notification,
    Story,
    StoryView,
    StoryReply,
    StoryLike,
    SavedPost,
    ApiPayloadData,
    FeedPost,
    AuthorData,
    networkImage_status,
    Assets,
    RestApiPayload,
    Friendship,
    Role,
    FriendshipStatus,
    findDataInput,
    GraphqlError
}