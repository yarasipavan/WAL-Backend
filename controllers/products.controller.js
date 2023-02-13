let products = [
  {
    productId: "Product1",
    name: "One",
    price: 40,
    brand: "brand1",
  },
];

//get all products
const getAllProducts = (req, res) => {
  res.send({ message: "All Products", payload: products });
};

//get product by productId
const getProductByProductId = (req, res) => {
  //get the productid from URL
  let productIdFromUrl = req.params.productId;
  console.log(productIdFromUrl);

  //search for the productId if found send the product else send the product not found with that product id
  let product = products.find(
    (productObj) => productObj.productId == productIdFromUrl
  );
  console.log(product);
  if (product === undefined) {
    res.send({ message: "No product Exist with that productId" });
  } else {
    res.send({ message: "Product found", payload: product });
  }
};

//create/add new product
const addNewProduct = (req, res) => {
  let newProduct = req.body;
  //let check the productId is already existed or not
  let productExist = products.find(
    (productObj) => productObj.productId === newProduct.productId
  );
  //if not exist then add/insert
  if (productExist === undefined) {
    products.push(newProduct);
    //send response
    res.send({ message: "Successfully created" });
  }
  //else send the same to client
  else {
    res.send({ message: "Product is already exixted with that productId" });
  }
};

//modify product
const modifyProduct = (req, res) => {
  //get the modify product from req
  let modifiedProduct = req.body;

  //find index of product need to be modify

  let indexOfModifyProduct = products.findIndex(
    (productObj) => modifiedProduct.productId === productObj.productId
  );

  // if index=-1 i.e not exist send the same to client
  if (indexOfModifyProduct === -1) {
    res.send({ message: "No product with that product Id to Modify" });
  }
  //else modify/update
  else {
    //update
    products.splice(indexOfModifyProduct, 1, modifiedProduct);
    res.send({ message: "Successfully Modified" });
  }
};

//delete product
const deleteProductByProductId = (req, res) => {
  //get the productId from url
  let productIdFromUrl = req.params.productId;

  //find the index of product need to be delete
  let indexOfDeleteProduct = products.findIndex(
    (productObj) => productIdFromUrl === productObj.productId
  );

  //if index=-1 i.e product is not existed , send the same
  if (indexOfDeleteProduct === -1) {
    res.send({ message: "No product is exist with that product to delete" });
  }
  //else delete the product
  else {
    //delete
    products.splice(indexOfDeleteProduct, 1);
    res.send({ message: "Successfully deleted" });
  }
};

module.exports = {
  getAllProducts,
  getProductByProductId,
  addNewProduct,
  modifyProduct,
  deleteProductByProductId,
};
