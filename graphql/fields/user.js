const graphql = require('graphql');
//Has GraphQL has a problem dealing with dates we are gona use graphql-iso-date
const graphqlISODate = require('graphql-iso-date');
const User = require("../../app/models/users");
const UsersType = require("../types/users");
const socket = require("../socket");

const {
    GraphQLString,
    GraphQLID,
    GraphQLList
} = graphql;

const {
    GraphQLDate
} = graphqlISODate;

//Basic Query to Retreave user by ID
const user = {
    type: UsersType,
    args: { _id: { type: GraphQLID } },
    resolve(parent, args){
        return User.findById(args._id)
    }
};

//Query to get All Users
const users = {
    type: new GraphQLList(UsersType),
    resolve(parent, args) {
        return User.find({});
    }
};

//Mutation Add new User
const addUser = {
    type: UsersType,
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve(parent, args){

        let user = new User({
            name: args.name,
            email: args.email,
            password: args.password
        });

        //Tell this channel that a user was created ( Subscription )
        socket.publish('USER_CREATED', {
            userCreated: user
        })

        return user.save();
    }
};

//Mutation Update User
const updateUser = {
    type: UsersType,
    args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve(parent, args){

        User.findById(args._id, (err, user) => {
            if(err){
              res.status(500).send(err);
            }else {
                user.name = args.name || user.name;
                user.email = args.email || user.email;
                user.password = args.password || user.password;
                user.save(user);
            }
        });

    }
};

const removeUser = {
    type: UsersType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve(parent, args){

        User.findByIdAndRemove(args._id, (err, user) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "User successfully deleted",
                id: user._id
            };
            return res.status(200).send(response);
        });

    }
};

module.exports = { user, users, addUser, updateUser, removeUser };