const path = require("path");
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query MyQuery {
      lollies {
        getLollies {
          id
            flavourTop
            flavourMiddle
            flavourBottom
            recipientName
            message
            senderName
            lollyPath          
        }
      }
    }
  `);

  console.log("this is");
  console.log(result);
  result.data.lollies.getLollies.map((data) => {
    createPage({
      path: `${data.lollyPath}`,
      component: path.resolve("./src/Template/Template.tsx"),
      context: {
        data: data,
      },
    });
  });
};
