const typeDefs = `#graphql
  
  type AuthorData {
    id: ID!
    username: String!
    email: String!
    profilePicture: String
}

type FeedPost {
    id: ID!
    caption: String!
    fileUrl: [String!]!
    commentCount: Int!
    likeCount: Int!
    createdAt: String!
    alreadyLiked: Boolean
    authorData: AuthorData!
}

type User {
    id: ID!
    username: String!
    email: String!
    password: String
    profilePicture: String
    bio: String
    createdAt: String
    updatedAt: String
    followers: [User]
    following: [User]
    isVerified: Boolean
    isPrivate: Boolean
    postCount: Int
    followersCount: Int
    followingCount: Int
    posts: [FeedPost]
    isFollowing: Boolean
    removeFollower: Boolean
    name: String!
}

type res {
    code: Int!
    message: String!
    status_code: Int!
    data: User!
}

  type Query {
    getProfileByUsername(username: String, profileId:String): res
  }

  # type Mutation {

  # }

  # type Subscription {
  #   # Add your subscriptions here
  # }
`;

export default typeDefs;