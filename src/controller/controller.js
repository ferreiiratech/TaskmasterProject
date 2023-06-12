const database = require("../database/db");
const Model = require("../model/ModelConfig")

const RootControll = (req, res) => {
  return res.render("index");
};

const RegisterUser = async (req, res) => {
  const { msg, status } = await Model.AuthRegisterUser(req)
  return res.send(msg);
};

module.exports = {
  RootControll,
  RegisterUser,
};
