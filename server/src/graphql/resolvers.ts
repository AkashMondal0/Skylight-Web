/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProfile } from "../controller/profile";

const resolvers = {
  Query: {
    getProfileByUsername: async (_: any, data: { username: string, profileId: string }) => await getProfile(data.username, data.profileId),
  },
};

export default resolvers;