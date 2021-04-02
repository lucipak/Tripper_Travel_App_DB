const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const PORT = 4000;
const app = express();
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'dark',
    },
  },
});

server.applyMiddleware({
  app,
});
// Express: Listener
app.listen(PORT, () => {
  console.log(`The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});
