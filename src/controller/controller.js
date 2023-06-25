const Model = require("../model/ModelConfig");

let message = "";
let messageType = "";

const rootControll = (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);

  return res.render("index", { message, messageType });
};

const registerUser = async (req, res) => {
  try {
    const { msg, status, idUser } = await Model.registerUserInDatabase(req);

    if (status === 201) {
      messageType = "sucess";

      req.session.login = idUser;
      return res.redirect(`/user/${idUser}`);
    }

    message = msg;
    // messageType = "danger";
    messageType = "typeCadastro";
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    message = "Erro ao registrar o usuário.";
    messageType = "typeCadastro";
    return res.redirect("/");
  }
};

const authLogin = async (req, res) => {
  try {
    const { msg, idUser } = await Model.authLoginUserInDatabase(req);

    if (idUser) {
      message = "";
      messageType = "typeLogin";

      // cria a session do usuário
      req.session.login = idUser;

      return res.redirect(`/user/${idUser}`);
    }

    message = msg;
    messageType = "typeLogin";

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    message = "Erro ao fazer login.";
    messageType = "typeLogin";
    return res.redirect("/");
  }
};

const authLoginGet = async (req, res, next) => {
  try {
    if (req.session.login === req.params.id) {
      return next();
    }

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

const getAllTaskUser = async (req, res) => {
  const { tasklist, user } = await Model.getAllUserTasksFromDatabase(
    req.params.id
  );

  return res.render("home", { tasklist, user });
};

const createTask = async (req, res) => {
  const userId = req.session.login;
  const { title, priority, date, time } = req.body;

  const dateTime = `${date}T${time}`;

  const respost = await Model.registerTaskInDatabase(
    userId,
    title,
    priority,
    dateTime
  );

  // console.log("AQui: ",respost)

  return res.redirect(`/user/${userId}`);
};

const taskCheck = async (req, res) => {
  const userId = req.session.login;
  try {
    const taskId = req.params.taskId;
    await Model.updateCheckboxTask(taskId);
  } catch (error) {
    console.log(error);
  }
  return res.redirect(`/user/${userId}`);
};

const taskDelete = async (req, res) => {
  const userId = req.session.login;

  try {
    const taskId = req.params.taskId;
    await Model.deleteTaskDatabase(taskId);
  } catch (error) {
    console.log(error);
  }

  return res.redirect(`/user/${userId}`);
};

const logout = (req, res) => {
  req.session.destroy();

  return res.redirect("/");
};

module.exports = {
  rootControll,
  registerUser,
  authLogin,
  authLoginGet,
  getAllTaskUser,
  createTask,
  taskCheck,
  taskDelete,
  logout,
};
