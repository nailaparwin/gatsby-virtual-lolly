const { ApolloServer, gql } = require('apollo-server-lambda')
//const axios = require("axios");
const faunadb = require("faunadb");
const query = faunadb.query;
axios = require("axios"), 
require("dotenv").config()

const typeDefs = gql`

  type Lolly {    
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
    getLollyByPath(lollyPath: String!): Lolly
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
    getLollies: async() => {
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
  
  getLollyByPath: async (_, { lollyPath }) => {
    try {
      console.log(lollyPath)
      var result = await client.query(
        q.Get(q.Match(q.Index("lolly_idx"), lollyPath))
      )
      return result.data
    } catch (e) {
      return e.toString()
    }
  },
},
  Mutation:{
    createLolly: async(_, args) => {      
      const client = new faunadb.Client({
        secret: process.env.FAUNADB_ADMIN_SECRET,
      })      
      const result = await client.query(
        query.Create(query.Collection("lollies"), {
          data: args
        })
      );
      
      axios.post("https://api.netlify.com/build_hooks/5fcd107726e26cc9096fdb8e")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
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

  
