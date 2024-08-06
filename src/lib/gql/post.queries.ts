import { GraphqlQueryType } from "./GraphqlQuery";

export const findOnePostQuery: GraphqlQueryType = {
  name: "findOnePost",
  operation: "query",
  query: `query findOnePostQuery($findOnePostId: String!) {
    findOnePost(id: $findOnePostId) {
      id
      content
      fileUrl
      createdAt
      updatedAt
      commentCount
      likeCount
      is_Liked
      comments {
        content
        createdAt
        id
        user {
          id
          email
          username
          name
          profilePicture
        }
      }
      user {
        id
        username
        name
        profilePicture
      }
    }
  }
`}