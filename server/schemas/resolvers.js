const { AuthenticationError } = require('apollo-server-express');
const { User, Excercise, Category, Session } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    exercises: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'sessions.exercises',
          populate: 'category'
        });

        user.sessions.sort((a, b) => b.sessionDate - a.sessionDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    session: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'sessions.exercises',
          populate: 'category'
        });

        return user.sessions.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
  
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addSession: async (parent, { exercises }, context) => {
      console.log(context);
      if (context.user) {
        const session = new Session({ exercises });

        await User.findByIdAndUpdate(context.user._id, { $push: { sessions: session } });

        return session;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
   
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
