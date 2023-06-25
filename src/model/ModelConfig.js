const { User, Task } = require("./ModelSchema");
const database = require("../database/db");
const bcrypt = require("bcrypt");
require("dotenv").config();

const checkUserExistenceByEmail = async (email) => {
  try {
    const userExists = await User.findOne({ email });
    return userExists;
  } catch (error) {
    throw new Error("Erro ao buscar usuário no banco de dados");
  }
};

const validateLoginPassword = async (email, enteredPassword) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      // Usuário não encontrado
      return null;
    }

    const passwordConfere = await bcrypt.compare(
      enteredPassword,
      user.password
    );

    return passwordConfere;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao validar a senha");
  }
};

// Registra o usuário
const registerUserInDatabase = async (req, res) => {
  let {
    "input-name-cad": name,
    "input-email-cad": email,
    "input-pass-cad": password,
  } = req.body;

  if (!name || !email || !password) {
    return { msg: "Preencha todos os campos", status: 422 };
  }

  const img_profile = req.file ? req.file.path : null;

  try {
    const userExists = await checkUserExistenceByEmail(email);

    if (userExists) {
      return { msg: "Email está em uso. Escolha outro", status: 409 };
    }

    password = await bcrypt.hash(password, 8);

    const registeredUser = await User.create({
      name,
      email,
      password,
      img_profile,
    });

    const idUser = registeredUser._id;

    return { msg: "Cadastro realizado com sucesso", status: 201, idUser };
  } catch (error) {
    console.log(error.message);

    return {
      msg: "Ocorreu um erro ao realizar o cadastro, tente novamente",
      status: 500,
    };
  }
};

const authLoginUserInDatabase = async (req, res) => {
  let { "input-email": email, "input-pass": password } = req.body;

  try {
    const userExists = await checkUserExistenceByEmail(email);

    if (!userExists) {
      return { msg: "Usuário ou senha inválidos", status: 401 };
    }

    const passwordConfere = await validateLoginPassword(email, password);

    if (!passwordConfere) {
      return { msg: "Usuário ou senha inválidos", status: 401 };
    }

    const idUser = userExists._id;

    return { idUser };
  } catch (error) {
    console.log(error);

    return { msg: "Erro ao realizar o login, tente novamente", status: 500 };
  }
};

const getAllUserTasksFromDatabase = async (userId) => {
  const tasklist = await Task.find({ userId });
  const user = await User.findOne({ _id: userId });

  return {tasklist, user};
};

const registerTaskInDatabase = async (userId, title, priority, dateTime) => {
  const result = await Task.create({ userId, title, priority, dateTime });
  console.log(result);
  return result;
};

const updateCheckboxTask = async (taskId) => {
  try {
    const task = await Task.findOne({ _id: taskId });
    task.check = !task.check;
    await task.save();
  } catch (error) {
    console.error("Erro ao atualizar a tarefa:", error);
  }
};

const deleteTaskDatabase = async (taskId) => {
  try {
    await Task.deleteOne({_id: taskId});
  } catch (error) {
    console.error("Erro ao deletar", error);
  }
}

module.exports = {
  registerUserInDatabase,
  authLoginUserInDatabase,
  getAllUserTasksFromDatabase,
  registerTaskInDatabase,
  updateCheckboxTask,
  deleteTaskDatabase,
};
