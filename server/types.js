const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime

  type Flight {
    cost: String
    time: String!
    stops: String
  }

  type Hotel {
    name: String
    address: String
    rating: String
    costPerNight: String
  }

  type Destination {
    name: String
    flights: [Flight]
    hotels: [Hotel]
    activities: [Activity]
  }

  type Activity {
    name: String!
    description: String!
    duration: String
    bookingNeeded: String
  }

  type Trip {
    username: String
    departuredate: String
    returndate: String
    destination: String
    flighttime: String
    hotel: String
    activity: String
    saved: String
  }

  type Query {
    destinations: [Destination]
    trips: [Trip]
  }

  type Mutation {
    saveTrip(
      username: String!
      departuredate: String!
      returndate: String!
      destination: String
      flighttime: String!
      hotel: String!
      activity: String!
      saved: String
    ): [Trip]
    deleteTrip(username: String, destination: String): [Trip]
    updateTrip(username: String, destination: String): [Trip]
  }
`;

module.exports = typeDefs;
