/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

/* module.exports = {
  
  plugins: [],
} */

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: `LOLLIES`,
        // This is the field under which it's accessible
        fieldName: `lollies`,
        // URL to query from
        url: `https://virtual-loly-with-gatsby.netlify.faunadb/.netlify/functions/newLolly`,
      },
    },
  ],
}; 
