const { MongoClient } = require("mongodb");

const userName = "panther1980";
const password = "JUAoJHSzpEmov9a3";
const dbName = "products_test";

const url = `mongodb+srv://${userName}:${password}@cluster0.aethqem.mongodb.net/${dbName}?retryWrites=true&w=majority`;

let client;

// (async () => {
//   try {
//     client = new MongoClient(url);
//     await client.connect();
//     console.log("Connected to MongoDB");

//     // Your application logic here

//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// })();

const createProduct = async (req, res, next) => {
  console.log("i am inside createProduct");
  let newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Could not store data" });
  }
  client.close();
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  // Implement your logic for retrieving products here
  const client = new MongoClient(url);
  let products;
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Could not retrieve data" });
  }
  client.close();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
