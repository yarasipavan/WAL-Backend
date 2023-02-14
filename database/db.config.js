//install mysql2 ->  npm install mysql2

//import mysql2
const mysql = require("mysql2");

//import dotenv
require("dotenv").config();
//create connection using createConnection method which return connection object

const connection = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
});

//export the connection object

module.exports = connection;
