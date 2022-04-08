const {GraphQLSchema, GraphQLObjectType} = require('graphql');
const { users, user } = require('./queries');
const { register, login } = require('./mutations');

const RootType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Root Query',
    fields: { 
        users: users,
        user: user,
    }
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Root Mutation",
    fields: {
        register: register,
        login: login,
    }  
});


const schema = new GraphQLSchema({
    query: RootType,
    mutation: MutationType
});

module.exports = schema;