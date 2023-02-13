let users = [
  {
    username: "pavan",
    age: 21,
    email: "yarasipavan@gmail.com",
  },
];

//get All users
const getAllUsers = (req, res) => {
  res.send({ mesage: "Users Data", payload: users });
  //this method is used to send the JSon object to client , it is not a JSOn,it will automatically convert into JSON
};

//get user by userName

const getUserByUserName = (req, res) => {
  //get the username from url
  let userNameFromUrl = req.params.userName;
  //search for the usename in local data with url username
  let userFromData = users.find(
    (userObj) => userObj.username === userNameFromUrl
  );
  //if user not found, send the same to client

  //if user found , send the user to client
  if (userFromData === undefined) {
    res.send({ message: "User Not Found" });
  } else {
    res.send({ mesage: "User Found", payload: userFromData });
  }
};

//create new user
const createNewUser = (req, res) => {
  //get the data from req for post method use app.use(express.json()) to parse the data and it will return the object
  let newUser = req.body;

  if (users.find((user) => user.username === newUser.username)) {
    res.send({ message: "User already existed" });
  } else {
    users.push(newUser);

    res.send({ message: "User Created" });
  }
};

//modify user
const modifyUser = (req, res) => {
  //get the modifyUser from req
  let modifyUser = req.body;

  //find the index of modifyUser
  let indexOfModifyUser = users.findIndex(
    (userObj) => userObj.username === modifyUser.username
  );

  // if index is -1 i.e modify user not found send the same to client
  if (indexOfModifyUser === -1) {
    res.send({ message: "User not found to modify" });
  }

  //else update
  else {
    users.splice(indexOfModifyUser, 1, modifyUser);
    res.send({ mesage: "User details modified successfully " });
  }
};

//delete user by username
const deleleUserByUserName = (req, res) => {
  //get the email/username to be deleted from url
  let userNameFromUrl = req.params.userName;

  //find the index of user need to be deleted
  let deleteUserIndex = users.findIndex(
    (userObj) => userObj.username === userNameFromUrl
  );

  //if index of user need to be deleted is -1 i.e user not found , send the same to client
  if (deleteUserIndex === -1) {
    res.send({ mesage: "User not found to delete" });
  }

  // else delete the user
  else {
    users.splice(deleteUserIndex, 1);
    res.send({ mesage: "User deleted Successfully" });
  }
};

module.exports = {
  getAllUsers,
  getUserByUserName,
  createNewUser,
  modifyUser,
  deleleUserByUserName,
};
