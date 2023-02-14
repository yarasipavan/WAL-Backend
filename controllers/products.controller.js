//import connection obj
const connection = require("../database/db.config");

//get all products
const getAllProducts = (req, res) => {
  connection.query("select * from products", (err, products) => {
    if (err) {
      console.log("Error while getting products", err);
      res.send({ message: err.message });
    } else res.send({ message: "products", payload: products });
  });
};

//get product by productId
const getProductByProductId = (req, res) => {
  //get the productid from URL
  let productIdFromUrl = Number(req.params.productId);
  //get the product details with product id
  connection.query(
    "select * from products where product_id=?",
    productIdFromUrl,
    (err, products) => {
      if (err) {
        console.log("Error while getting product", err);
      } else {
        res.send({ message: "product", payload: products[0] });
      }
    }
  );
};

//create/add new product
const addNewProduct = (req, res) => {
  //get the product details need to add from req body
  let {
    product_id,
    product_name,
    product_price,
    product_date_of_manufactured,
  } = req.body;
  product_date_of_manufactured = new Date(product_date_of_manufactured);
  connection.query(
    "insert into products set product_id=?,product_name=?,product_price=?,product_date_of_manufactured=?",
    [product_id, product_name, product_price, product_date_of_manufactured],
    (err, result) => {
      if (err) {
        console.log("Error while creating product: ", err);
        res.send({ message: err.message });
      } else {
        res.send({ message: "Product added successfully" });
      }
    }
  );
};

//modify product
const modifyProduct = (req, res) => {
  //get the modify product from req
  let {
    product_id,
    product_name,
    product_price,
    product_date_of_manufactured,
  } = req.body;
  //update the product by productId
  connection.query(
    "update products set product_id=?,product_name=?,product_price=?,product_date_of_manufactured=? where product_id=?",
    [
      product_id,
      product_name,
      product_price,
      product_date_of_manufactured,
      product_id,
    ],
    (err, result) => {
      if (err) {
        console.log("Error while updating product: ", err);
        res.send({ message: err.message });
      } else {
        res.send({ message: "Product modified successfully" });
      }
    }
  );
};

//delete product
const deleteProductByProductId = (req, res) => {
  //get the productId from url
  let productIdFromUrl = req.params.productId;

  ///delete the product from db
  connection.query(
    "delete from products where product_id=?",
    productIdFromUrl,
    (err, result) => {
      if (err) {
        console.log("Error while deleteing product: ", err);
        res.send({ message: err.message });
      } else {
        if (result.affectedRows == 0)
          res.send({ message: "Product not found to delete " });
        else {
          res.send({ message: "Product Deleted" });
        }
      }
    }
  );
};

module.exports = {
  getAllProducts,
  getProductByProductId,
  addNewProduct,
  modifyProduct,
  deleteProductByProductId,
};
