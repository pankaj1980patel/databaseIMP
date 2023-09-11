const express = require("express");
const bodyParser = require("body-parser");
const { createProduct, getProducts } = require("./mongoogse");
// const { createProduct, getProducts } = require("./mongo");

const app = express();

app.use(bodyParser.json());

app.get("/products",getProducts);
app.post("/products",createProduct);

app.listen(3500);
