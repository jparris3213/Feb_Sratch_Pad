//Package Import Dialog
const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth")
const app = express();
const PORT = process.env.PORT || 3001;

//Apollo Server Set Up
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

// Applying Middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended:true }));
app.express(json());

//Serve client/build as static assets when in preoduction
if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

//Future Note, can this all be automated similar to create react app to fit a 'standard' server set up for me?

//Base Webpage Display
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, 'build','index.html'));
});

//Start Server and GraphQL
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API is Running on Port http://localhost:${PORT}`);
        console.log(`Use GraphQl at http://localhost:${PORT}${server.graphqlPath}`);
    });
});