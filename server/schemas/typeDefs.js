const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Category {
  _id: ID
  name: String
}

  type Exercise {
    _id: ID
    exerciseName: String
    currentMaxWeight: Int
    targetMaxWeight: Int
    sessionWeight: Int
    repsTarget: Int
    repsActual: Int
  }

  type Session {
    _id: ID
    sessionDate: String
    exercises: [Exercise]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    workoutDays:Int
    agressiveness:String
    heightCm:Int
    heightIn:Int
    heightFt:Int
    weightLb:Int
    sessions: [Session]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    exercises(category: ID, name: String): [Exercise]
    exercise(_id: ID!): Exercise
    user: User
    session(_id: ID!): Session
   
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addSession(exercises: [ID]!): Session
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
