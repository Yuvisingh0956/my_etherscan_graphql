// Import ApolloServer and schema 
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import data source 
const EtherDataSource = require("./datasource/ethDatasource");

// Import schema
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables
require("dotenv").config();

// Define resolvers
const resolvers = {
 Query: {
   etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver to get ether balance for an address
     dataSources.ethDataSource.etherBalanceByAddress(),

   totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver to get total ether supply
     dataSources.ethDataSource.totalSupplyOfEther(),

   latestEthereumPrice: (root, _args, { dataSources }) => // Resolver to get latest ether price
     dataSources.ethDataSource.getLatestEthereumPrice(),

   blockConfirmationTime: (root, _args, { dataSources }) => // Resolver to get block confirmation time
     dataSources.ethDataSource.getBlockConfirmationTime(),
 },
};

// Create ApolloServer instance
const server = new ApolloServer({
 typeDefs,
 resolvers,
 dataSources: () => ({
   ethDataSource: new EtherDataSource(), // Instantiate data source
 }), 
});

// Set timeout and start server
server.timeout = 0; 
server.listen("9000").then(({ url }) => {
 console.log(`🚀 Server ready at ${url}`);
});