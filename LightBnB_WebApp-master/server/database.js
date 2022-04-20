//Connect to database lightbnb
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  //Define variables queryText and values
  const queryText = `
    SELECT * FROM users
    WHERE email = $1;`;

  const values = [email.toLowerCase()];

  return pool
    .query(queryText, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      console.log("userWithEmail", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log("err", err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function(id) {
  //Define variables queryText and values
  const queryText = `
  SELECT * FROM users
  WHERE id = $1;`;

  const values = [id];

  return pool
    .query(queryText, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      console.log("userWithId", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log("err", err.message);
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const queryText = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [user.name, user.email, user.password];

  return pool
    .query(queryText, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      console.log("addedUser", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = function(guest_id, limit = 10) {
  //Select all data relating to reservations and properties to facilitate current/ future info requirements for reservations
  const queryText = `  
  SELECT reservations.*, properties.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`;

  const values = [guest_id, limit];

  return pool
    .query(queryText, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      console.log("reservationsWithGuestId", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log("err", err.message);
    });
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  //Setup an array to hold any parameters that may be available for the query.
  const queryParams = [];
  //Start the query with all information that comes before the WHERE clause.
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;
    /*@TODO - Consider the edge case where options.city === false and handle it.*/
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `AND cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
  }
  if (options.minimum_price_per_night && !options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `AND cost_per_night >= $${queryParams.length}`;
  }
  if (!options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `AND cost_per_night < $${queryParams.length}`;
  }
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `AND property_reviews.rating >= $${queryParams.length} `;
  }
  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams).then((res) => res.rows);
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = function(property) {
  const keys = Object.keys(property);
  const propFeatures = function(keys) {
    let result = [];
    for (const key of keys) {
      result.push(property[key]);
    }
    return result;
  };
  const values = propFeatures(keys);
  const queryText = `INSERT INTO properties (
    title,
    description,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country,
    city,
    province,
    post_code,
    owner_id
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `;
  return pool
    .query(queryText, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      console.log("reservationsWithGuestId", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log("err", err.message);
    });
};

exports.addProperty = addProperty;
