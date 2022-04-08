const { GraphQLString } = require("graphql");
const { User } = require("../models");
const { createJWT } = require("../util/auth");

const register = {
    type: GraphQLString,
    description: "Register a new user and return a JWT token",
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
    },
    async resolve( parents , args) {
        const { name, email, password, displayName } = args;
        const user = new User({ name, email, password, displayName });
        await user.save();
        const token = createJWT({ userId: user._id, email: user.email, displayName: user.displayName, name: user.name});
        return token; 
    },
};

const login = {
    type: GraphQLString,
    description: "Login a user and return a JWT token",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve( parents , args) {
        const { email, password } = args;
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
            throw new Error("User not found");
        }
        const isEqual = args.password === user.password;
        if (!isEqual) {
            throw new Error("Password is incorrect");
        }
        const token = createJWT({ userId: user._id, email: user.email, displayName: user.displayName, name: user.name});
        return token;
    },
};

module.exports = { register, login };