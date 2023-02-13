// create mini express app (router)
const express = require("express");
const productApp = express.Router();

//body-parser
productApp.use(express.json());

//import product controllers
const {
  getAllProducts,
  getProductByProductId,
  addNewProduct,
  modifyProduct,
  deleteProductByProductId,
} = require("../controllers/products.controller");

//get all products
productApp.get("/products", getAllProducts);

//get product by productId
productApp.get("/product/:productId", getProductByProductId);

//create new product
productApp.post("/add-product", addNewProduct);

//modify product
productApp.put("/update-product", modifyProduct);

//delete product by productId
productApp.delete("/delete/:productId", deleteProductByProductId);

module.exports = productApp;
