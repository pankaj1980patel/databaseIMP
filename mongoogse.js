const mongoose = require("mongoose");
const Product = require("./model/product");

const userName = "panther1980";
const password = "JUAoJHSzpEmov9a3";
const dbName = "products_test";

const url = `mongodb+srv://${userName}:${password}@cluster0.aethqem.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log("we are connected to database.");
  })
  .catch((error) => {
    console.log("Error in db conncection : ", error);
  });
const createProduct = (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = createdProduct.save();
  res.json(result);
};
const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
