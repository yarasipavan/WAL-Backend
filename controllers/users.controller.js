//import connection obj
const connection = require("../database/db.config");

//get All users
const getAllUsers = (req, res) => {
  connection.query("select * from wal_table", (err, emps) => {
    if (err) {
      console.log("Error while getting emps: ", err);
      res.send({ message: `Error while getting users: ${err.message}` });
    } else {
      res.send({ message: "success", payload: emps });
    }
  });
};

//get user by empId

const getUserByUserName = (req, res) => {
  //get the empid fromurl
  let empIdFromUrl = req.params.empId;
  //search fro that in db
  connection.query(
    "select * from wal_table where emp_id=?",
    empIdFromUrl,
    (err, empObj) => {
      if (err) {
        console.log("Error while getting emps: ", err);
        res.send({ message: `Error while getting user: ${err.message}` });
      } else {
        res.send({ message: "Employee", payload: empObj });
      }
    }
  );
};

//create new user
const createNewUser = (req, res) => {
  //get the details from req body
  //destructure the details
  let { emp_id, emp_name, emp_designation, emp_city, emp_age } = req.body;
  //search whether the is an emp with that empId or else just insert to database  if emp with that empId is already exist , it raises an error

  connection.query(
    "insert into wal_table set emp_id=?,emp_name=?,emp_designation=?,emp_city=?,emp_age=?",
    [emp_id, emp_name, emp_designation, emp_city, emp_age],
    (err, result) => {
      if (err) {
        console.log("Error while inserting emps: ", err);
        res.send({ message: err.message });
      } else {
        res.send({ message: "Created emp" });
      }
    }
  );
};

//modify user
const modifyUser = (req, res) => {
  //get the modify user details from body
  let { emp_id, emp_name, emp_designation, emp_city, emp_age } = req.body;
  //update the details in db
  connection.query(
    "update wal_table set emp_id=?,emp_name=?,emp_designation=?,emp_city=?,emp_age=? where emp_id=?",
    [emp_id, emp_name, emp_designation, emp_city, emp_age, emp_id],
    (err, result) => {
      if (err) {
        console.log("Error while modifing emp: ", err);
        res.send({ message: err.message });
      } else {
        console.log(result);
        res.send({ message: "Modified emp" });
      }
    }
  );
};

//delete user by username
const deleleUserByUserName = (req, res) => {
  //get the empId fro url
  let empIdFromURl = req.params.empId;
  // delete the emp from db if exist

  connection.query(
    "delete from wal_table where emp_id=?",
    empIdFromURl,
    (err, result) => {
      if (err) {
        console.log("Eoor while emp deleting: ", err);
        res.send({ message: err.message });
      } else {
        res.send({ message: "Emp Deleted " });
      }
    }
  );
};

module.exports = {
  getAllUsers,
  getUserByUserName,
  createNewUser,
  modifyUser,
  deleleUserByUserName,
};
