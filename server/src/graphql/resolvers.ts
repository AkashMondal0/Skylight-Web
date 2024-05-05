
const resolvers = {
  Query: {
    books: () => {
      return [
        { data: "dadu bara bokachoda" }
      ];
    },
  },
};

export default resolvers;