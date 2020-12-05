const { ApolloServer, gql } = require('apollo-server-lambda')
const axios = require("axios");
const faunadb = require("faunadb");
const shortid = require("shortid")
const query = faunadb.query;


const typeDefs = gql`

  type Lolly {
    id: ID!
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!  
  }
  type Query {
    getLollies: [Lolly!]
  }  
  type Mutation {
    createLolly(
      recipientName: String!
      message: String!
      senderName: String!
      flavourTop: String!
      flavourMiddle: String!
      flavourBottom: String!
      lollyPath: String!  
    ): Lolly
  }
`;

const resolvers = {
  Query: {
    getLollies: async (root, args, context) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_ADMIN_SECRET,
        });

        const result = await client.query(
          query.Map(
            query.Paginate(query.Match(query.Index("lolly_idx"))),
            query.Lambda("x", query.Get(query.Var("x")))
          )
        );

        return result.data.map((d) => {
          return {
            id: d.ref.id,
            flavourTop: d.data.flavourTop,
            flavourMiddle: d.data.flavourMiddle,
            flavourBottom: d.data.flavourBottom,
            recipientName: d.data.recipientName,
            message: d.data.message,
            senderName: d.data.senderName,
            lollyPath: d.data.lollyPath,
          };
        });
      } catch (error) {
        console.log("Error in fetching Data : ", error);
      }
    },
  },
  Mutation:{
    createLolly: async(_, args) => {
      console.log("create all")
      const client = new faunadb.Client({
        secret: process.env.FAUNADB_ADMIN_SECRET,
      })
      const id = shortid.generate();
      args.lollyPath = id
      const result = await client.query(
        query.Create(query.Collection("lollies"), {
          data: args
        })
      )
      console.log(result.data)
      return result.data
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }

/////////////////

  
