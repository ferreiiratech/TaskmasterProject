const { User, Task } = require("./ModelSchema");
const database = require("../database/db");
const bcrypt = require("bcrypt");
require("dotenv").config();

const ValidateDataUser = async (email) => {
  try {
    const UserExists = await User.findOne({ email });
    return UserExists;
  } catch (e) {
    console.log(e.message);
  }
};

// Registra o usuário
const AuthRegisterUser = async (req, res) => {
  let {
    "input-name-cad": name,
    "input-email-cad": email,
    "input-pass-cad": password,
  } = req.body;

  if (!name || !email || !password) {
    return { msg: "Preencha todos os campos", status: 422 };
  }

  const img_profile = req.file ? req.file.path : null;
  //const img_profile = req.file.path.replace(/\\/g, "\\\\");

  try {
    const UserExists = await ValidateDataUser(email);

    if (UserExists) {
      return { msg: "Email está em uso. Escolha outro", status: 409 };
    }

    password = await bcrypt.hash(password, 8);

    const RegisteredUser = await User.create({
      name,
      email,
      password,
      img_profile,
    });

    const IdUser = RegisteredUser._id;

    return { msg: "Cadastro realizado com sucesso", status: 201, IdUser };
  } catch (e) {
    console.log(e.message);

    return {
      msg: "Ocorreu um erro ao realizar o cadastro, tente novamente",
      status: 500,
    };
  }
};

const ValidadePassword = async (passwordUser, passwordCript) => {
  try {
    const passwordConfere = await bcrypt.compare(passwordCript, passwordUser);

    return passwordConfere;
  } catch (e) {
    console.log(e.message);
  }
};

const AuthLoginDb = async (req, res) => {
  let { "input-email": email, "input-pass": password } = req.body;

  const UserExists = await ValidateDataUser(email);

  if (!UserExists) {
    return { msg: "Usuário ou senha inválidos", status: 401 };
  }

  const PasswordConfere = await ValidadePassword(UserExists.password, password);

  if (!PasswordConfere) {
    return { msg: "Usuário ou senha inválidos", status: 401 };
  }

  const IdUser = UserExists._id;

  return { IdUser };
};

module.exports = {
  AuthRegisterUser,
  AuthLoginDb,
};
