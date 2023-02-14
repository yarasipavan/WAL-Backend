//create mini express app (router)
const express = require("express");
const userApp = express.Router();

//body parser midddleware
userApp.use(express.json());

//import user controllers
const {
  getAllUsers,
  getUserByUserName,
  createNewUser,
  modifyUser,
  deleleUserByUserName,
} = require("../controllers/users.controller");

//routes

userApp.get("/users-data", getAllUsers);

// route to get the userDetails by username
userApp.get("/user/:empId", getUserByUserName);

userApp.post("/create-user", createNewUser);

userApp.put("/modify-user", modifyUser);

userApp.delete("/delete-user/:empId", deleleUserByUserName);

//export router
module.exports = userApp;
