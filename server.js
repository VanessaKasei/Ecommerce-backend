const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./route/user.route");
const cors = require("cors");
// require("dotenv").config();

const app = express();


app.use(cors());

app.use(express.json());

app.use("/api/users", userRoute);

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


