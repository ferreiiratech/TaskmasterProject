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
  const tasklist = await Model.getAllUserTasksFromDatabase(req.params.id);
  console.log("Task: ",tasklist);



  // if(tasklist.length > 0){
  //   return res.send("SIM");
  // } else{
  //   return res.send("NÂO");
  // }

  return res.render("home", {tasklist, img_profile: null})
};

const createTask = async (req, res) => {
  const userId = req.session.login
  const {title, description} = req.body;

  const respost = await Model.registerTaskInDatabase(userId, title, description)

  console.log("AQui: ",respost)

  return res.redirect(`/user/${userId}`)

}

module.exports = {
  rootControll,
  registerUser,
  authLogin,
  authLoginGet,
  getAllTaskUser,
  createTask,
};
