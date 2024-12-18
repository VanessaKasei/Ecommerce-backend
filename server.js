const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./route/user.route");
const categoryRoute = require("./route/category.route");
const productRoute = require("./route/product route");
const cartRoute = require("./route/cart.route");
const orderRoutes = require("./route/order.route")
const cors = require("cors");
const app = express();

app.use(cors({
  origin: 'http://84.247.137.154:8085',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use('/api/orders', orderRoutes);

mongoose
  .connect(
    "mongodb+srv://Vanessa:q2zmYzd3sffk@ecommerce.wnfkn.mongodb.net/Ecommerce?retryWrites=true&w=majority"
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
