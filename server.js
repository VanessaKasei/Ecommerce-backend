require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./route/user.route");
const categoryRoute = require("./route/category.route");
const productRoute = require("./route/product.route");
const cartRoute = require("./route/cart.route");
const orderRoutes = require("./route/order.route")
const cors = require("cors");
const app = express();
const mongoURI = process.env.MONGO_URI;
app.use(cors({
  // origin: [
  // 'http://84.247.137.154:8085', 
  // 'http://localhost:3000'       
  // ],
  origin: ['https://commercecore.andsons.co.ke', 'http://84.247.137.154:8085',
    'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

//these are my routes


app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use('/api/orders', orderRoutes);


mongoose
  .connect(
    mongoURI
  )
  .then(() => {
    console.log("Connected to the database");
    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  })
  .catch((error) => {
    console.error("Connection failed", error);
  });
