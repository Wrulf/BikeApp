/**
 * Searches for bike trips in the database based on the given query parameters.
 *
 * @param {Object} query - The query parameters for the trip search.
 * @param {number[]} query.departureStationId - The IDs of the departure stations.
 * @param {number[]} query.returnStationId - The IDs of the return stations.
 * @param {string} query.departureTime - The earliest departure time (YYYY-MM-DD).
 * @param {string} query.returnTime - The latest return time (YYYY-MM-DD).
 * @param {number} query.coveredDistanceMeters - The covered distance in meters.
 * @param {number} query.durationSeconds - The duration of the trip in seconds.
 * 
 * @returns {Promise<string>} A promise that resolves with a JSON string of the found trips.
 */

// Import database object
const db = require('../db');
// Import Op (Operators) object from sequelize package. gte(≥) and lte(≤) are used
const { Op } = require('sequelize');


const findTrips = async (req, res, next) => {
 // Destructuring assignment to get each value in query to it's own const
  const {
    departureStationIds,
    returnStationIds,
    departureTime,
    returnTime,
    coveredDistanceMeters,
    durationSeconds
  } = req.query;

  // Construct the where clause. {} to be filled with key-value pairs
  let where = {};
  if (departureStationIds) where.departureStationId = { [Op.in]: departureStationIds }; // Op.in any value within array of values
  if (returnStationIds) where.returnStationId = { [Op.in]: returnStationIds };
  if (departureTime) where.departureTime = { [Op.gte]: new Date(departureTime) }; // gte = greater than or equal to
  if (returnTime) where.returnTime = { [Op.lte]: new Date(returnTime) }; // lto = less than or equal to
  if (coveredDistanceMeters) where.coveredDistanceMeters = coveredDistanceMeters;
  if (durationSeconds) where.durationSeconds = durationSeconds;

  // Query the database with where object as conditions
  const trips = await db.models.Biketrip.findAll({
    where,
    attributes: ['departureTime', 'returnTime', 'departureStationId', 'returnStationId', 'coveredDistanceMeters', 'durationSeconds'],
    include: [{
      model: db.models.Bikestation,
      as: 'DepartureStation', // as = alias for assosiation
      attributes: [] // do not include extra attributes from model
    },
    {
      model: db.models.Bikestation,
      as: 'ReturnStation',
      attributes: []
    }]
  });

  // Prepare the trips data by getting only the dataValues from the query, and not wrapped in a instance of a Sequelize model
  // trips(array of model instances) -> preparedTrips(array of dataValue)
  const preparedTrips = trips.map(trip => trip.dataValues);

  // Convert the trips data to a JSON string
  //const jsonTrips = JSON.stringify(preparedTrips);

  console.log(`Found ${trips.length} trips.`);
  // console.log(jsonTrips);

  res.json(preparedTrips);
};

// // Usage example
// findTrips({
//   departureStationIds: [116,147],
//   returnStationIds: [17, 232],
//   //departureTime: '2021-04-31',
//   //returnTime: '2021-07-01',
// });

module.exports = { findTrips };