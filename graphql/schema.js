//This is where you define yours Query's, Mutation's and Subscription's;
const graphql = require('graphql');
const subscriptions = require("./subscriptions");
const { user, users, addUser, updateUser, removeUser } = require("./fields/user");

const {
    GraphQLObjectType,
    GraphQLSchema
} = graphql;

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        //Here you define your query name Ex: "user: user"
        //firts the name you will use to query data and second the required const from Fields  
        user: user, 
        users: users
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Here you define your mutations ( add, update, remove ) name Ex: "user: user"
        //firts the name you will use to query data and second the required const from Fields  
        addUser: addUser, 
        updateUser: updateUser, 
        removeUser: removeUser
    }
});

const Subscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: subscriptions
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
    subscription: Subscription
});


