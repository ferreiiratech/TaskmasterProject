const database = require("../database/db");
const Model = require("../model/ModelConfig");
const { User } = require("../model/ModelSchema");

let message = "";
let type = "";

const RootControll = (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);

  return res.render("index", { message, type });
};

const RegisterUser = async (req, res) => {
  const { msg, status, IdUser } = await Model.AuthRegisterUser(req);

  if (status === 201) {
    type = "sucess";

    req.session.login = IdUser;
    return res.redirect(`/user/${IdUser}`);
  }

  message = msg;
  type = "danger";
  return res.redirect("/");
};

const AuthLogin = async (req, res) => {
  const { msg, IdUser } = await Model.AuthLoginDb(req);
  message = msg;
  type = "danger";
  if (IdUser) {
    message = "";
    type = "sucess";

    // cria a session do usuário
    req.session.login = IdUser;

    return res.redirect(`/user/${IdUser}`);
  }

  return res.redirect("/");
};

const AuthLoginGet = async (req, res, next) => {
  if (req.session.login === req.params.id) {
    return next();
  }

  return res.redirect("/");
};

module.exports = {
  RootControll,
  RegisterUser,
  AuthLogin,
  AuthLoginGet,
};
