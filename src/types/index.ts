interface FeedPost {
    id: string
    caption: string
    fileUrl: string[]
    commentCount: number
    likeCount: number
    createdAt: Date | string
    alreadyLiked: boolean | null
    authorData: AuthorData
    comments: Comment[]
    likes: AuthorData[]
    isDummy?: boolean
}

interface AuthorData {
    id: string
    username: string
    email: string
    name: string
    profilePicture?: string
    isFollowing?: boolean,
}
enum Role {
    User = 'user',
    Admin = 'admin',
}
interface User {
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
    RestApiPayload
}