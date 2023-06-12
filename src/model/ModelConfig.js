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

  const img_profile = req.file.path;
  //const img_profile = req.file.path.replace(/\\/g, "\\\\");

  try {
    const UserExists = await ValidateDataUser(email);

    if (UserExists) {
      return { msg: "Email está em uso. Escolha outro", status: 409 };
    }

    password = await bcrypt.hash(password, 8);

    const register = await User.create({ name, email, password, img_profile });

    return { msg: "Cadastro realizado com sucesso", status: 201 };
  } catch (e) {
    console.log(e.message);

    return {
      msg: "Ocorreu um erro ao realizar o cadastro, tente novamente",
      status: 500,
    };
  }
};

module.exports = {
  AuthRegisterUser,
};
