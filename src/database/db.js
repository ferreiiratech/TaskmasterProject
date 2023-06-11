const mongoose = require("mongoose");
require("dotenv").config();

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

console.log(USER, PASSWORD);

const conectToDB = () => {
  mongoose
    .connect(
      `mongodb+srv://${USER}:${PASSWORD}@principal.jyoaejc.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("MongoDb conectado");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = conectToDB;