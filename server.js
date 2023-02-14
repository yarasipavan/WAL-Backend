const express = require("express");
const app = express();

//import dotenv
require("dotenv").config();
//import mysql connectionObj

const connection = require("./database/db.config");
connection.connect((err) => {
  if (err) {
    console.log("Error in DB connection: ", err);
  } else {
    console.log("DB Connection Success");
  }
});
let port = process.env.port || 4000;
app.listen(port, () => console.log(`Server started on port no: ${port}`));

let userAPI = require("./routes/users.route"); //import users route
let productAPI = require("./routes/products.route"); //import product-route

//make the use users routes when the request starts with user-api
app.use("/user-api", userAPI); //path middleware
app.use("/product-api", productAPI); //similarly for products

//handling invalid path
app.get("*", (req, res) => {
  res.send({ mesage: "Invalid Path" });
});

//errors handling

app.use((err, req, res, next) => {
  res.send({ mesage: "Error Occured", error: err.message });
});
