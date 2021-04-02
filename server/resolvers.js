const client = require('../db/index');
const { GraphQLScalarType, Kind } = require('graphql');
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} = require('graphql-iso-date');

// const GraphQLJSON = require('graphql-type-json');

const sampleDestination = [
  {
    name: 'Copenhagen',
    flights: [
      {
        cost: '435 USD',
        time: '08:30',
        stops: '2, NYC | LONDON',
      },
      {
        cost: '613 USD',
        time: '13:00',
        stops: 'Direct',
      },
      {
        cost: '330 USD',
        time: '05:45',
        stops: '4, DALLAS | NYC | LONDON | COLOGNE',
      },
    ],
    hotels: [
      {
        name: 'Absalon Hotel',
        address: 'Helgolandsgade 15, 1653 København, Denmark',
        rating: '4.4/5',
        costPerNight: '75 USD',
      },
      {
        name: 'Andersen Hotel',
        address: 'Helgolandsgade 12, 1653 København, Denmark',
        rating: '4.5/5',
        costPerNight: '93 USD',
      },
      {
        name: "Hotel D'Angleterre",
        address: 'Kongens Nytorv 34, 1050 København, Denmark',
        rating: '4.6/5',
        costPerNight: '416 USD',
      },
    ],
    activities: [
      {
        name: 'Tivoli Gardens',
        description: '19th-century amusement park with rides',
        duration: 'variable',
        bookingNeeded: 'Recommended',
      },
      {
        name: 'The Little Mermaid',
        description: 'Bronze sculpture & iconic landmark',
        duration: '5-10 minutes',
        bookingNeeded: 'No',
      },
      {
        name: 'Strøget',
        description: 'Famed pedestrian street lined with shops',
        duration: 'variable',
        bookingNeeded: 'No',
      },
    ],
  },
  {
    name: 'Santiago',
    flights: [
      {
        cost: '634 USD',
        time: '12:10',
        stops: '1, DAL',
      },
      {
        cost: '967 USD',
        time: '17:00 +1',
        stops: 'Direct',
      },
      {
        cost: '577 USD',
        time: '05:15',
        stops: '4, MIA | QUITO | LIMA | BUENOS AIRES ',
      },
    ],
    hotels: [
      {
        name: 'Hotel NH Ciudad de Santiago',
        address: 'Av. Condell 40, Providencia, Biobío, Chile',
        rating: '4.3/5',
        costPerNight: '60 USD',
      },
      {
        name: 'W Santiago',
        address:
          'Isidora Goyenechea 3000, Las Condes, Región Metropolitana, Chile',
        rating: '4.6/5',
        costPerNight: '143 USD',
      },
      {
        name: 'Solace Hotel Santiago',
        address:
          'Monseñor Nuncio Sotero Sanz de Villalba 115, Providencia, Región Metropolitana, Chile',
        rating: '4.6/5',
        costPerNight: '80 USD',
      },
    ],
    activities: [
      {
        name: 'Central Market',
        description: 'Bustling seafood market with restaurants',
        duration: 'variable',
        bookingNeeded: 'No',
      },
      {
        name: 'San Cristobal Hill',
        description: 'Hiking spot and panoramic city views',
        duration: '1.5 hours',
        bookingNeeded: 'No',
      },
      {
        name: 'National Museum of Fine Arts',
        description: 'Contemporary art in a historic palace',
        duration: '2.5 hours',
        bookingNeeded: 'Yes',
      },
    ],
  },
];

const resolvers = {
  Query: {
    // time: async () => {
    //   return (await client.query('select * from times')).rows;
    // },
    destinations: () => sampleDestination,
    trips: async () => {
      try {
        const query = 'select * from saved';
        return (await client.query(query)).rows;
      } catch {
        console.log(err);
      }
    },
  },
  Trip: async () => {
    const query = 'select * from saved';
    return await client
      .query(query)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },
  Hotel: () => sampleDestination.hotels,
  Flight: () => sampleDestination.flights,
  Activity: () => sampleDestination.activities,
  Mutation: {
    saveTrip: (root, args, context, info) => {
      const {
        username,
        departuredate,
        returndate,
        destination,
        flighttime,
        hotel,
        activity,
        saved,
      } = args;
      const params = [
        username,
        departuredate,
        returndate,
        destination,
        flighttime,
        hotel,
        activity,
        saved,
      ];
      console.log(params);
      const query =
        'INSERT INTO saved (username, departuredate, returndate, destination, flighttime, hotel, activity, saved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
      client
        .query(query, params)
        .then(() => console.log('successful post'))
        .catch((err) => console.log(err));
      // return sampleTrips;
    },
    deleteTrip: (root, args, context, info) => {
      const { username, destination } = args;
      const params = [username, destination];
      const query = 'DELETE FROM saved WHERE username=$1 AND destination=$2';
      client
        .query(query, params)
        .then(() => console.log('successful deletion'))
        .catch((err) => console.log(err));
    },
    updateTrip: (root, args, context, info) => {
      const { username, destination } = args;
      const params = ['false', username, destination];
      const query =
        'UPDATE saved SET saved=$1 where username=$2 AND destination=$3';
      client
        .query(query, params)
        .then(() => console.log('successful update'))
        .catch((err) => console.log(err));
    },
  },
};

module.exports = resolvers;
