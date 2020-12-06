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
        
        url: `http://localhost:8888/.netlify/functions/newLolly`,
        //url: `https://virtual-lolly-with-gatsby-faunadb.netlify.app/.netlify/functions/newLolly`,
      },
    },
  ],
}; 
