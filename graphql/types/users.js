const graphql = require("graphql");
const graphqlISODate = require('graphql-iso-date');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
} = graphql;

const {
    GraphQLDate,
} = graphqlISODate;

const UsersType = new GraphQLObjectType({
    name: "Users",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        createdOn: { type: GraphQLDate }
    })
});

module.exports = UsersType;