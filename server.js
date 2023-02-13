const express = require("express");
const app = express();
app.listen(5000, () => console.log("Server started on port no: 5000"));

// import user-API Router
let userAPI = require("./routes/users.route");
//make the User api when the request starts with user-api
app.use("/user-api", userAPI); //path middleware

let productAPI = require("./routes/products.route");
app.use("/product-api", productAPI);

//handling invalid path
app.get("*", (req, res) => {
  res.send({ mesage: "Invalid Path" });
});

//errors handling

app.use((err, req, res, next) => {
  res.send({ mesage: "Error Occured", error: err.message });
});
