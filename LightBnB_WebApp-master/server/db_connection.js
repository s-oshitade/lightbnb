require('dotenv').config();
//Connect to database lightbnb
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE
});

pool.connect(err => {
  if(err){
    console.log(err);
  } else {
    console.log("Connected!");
  }
});

module.exports = { pool };