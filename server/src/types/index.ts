interface FeedPost {
    id: string
    caption: string
    fileUrl: string[]
    commentCount: number
    likeCount: number
    createdAt: Date
    alreadyLiked: boolean | null
    authorData: {
        id: string
        username: string
        email: string
        profilePicture: string
    }
}

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
    followers: User[]
    following: User[]
    isVerified: false,
    isPrivate: false,
    postCount: number,
    followersCount: number,
    followingCount: number,
    posts: FeedPost[]
    isFollowing: boolean,
    removeFollower: boolean,
    name: string
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
    updatedAt: Date;
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
}

interface Like {
    id: string;
    authorId: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
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

interface Dm {
    id: string;
    content: string;
    authorId: string;
    receiverId: string;
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

interface PayloadData {
    payload: {
        code: number,
        message: string,
        data: {
            email: string,
            username: string,
            id: string,
            profilePicture: string,
            token: string,
        }
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
    Dm,
    Story,
    StoryView,
    StoryReply,
    StoryLike,
    SavedPost,
    PayloadData,
    FeedPost
}