const router = require("express").Router();
const multer = require("multer");
const SaveProfileImg = require("../middlewares/SaveProfileImg");
const Controller = require("../controller/controller");

const Upload = multer({ storage: SaveProfileImg.storage });

router.get("/", Controller.rootControll);

// rota de cadastro
router.post(
  "/user/auth/register",
  Upload.single("image-input"),
  Controller.registerUser,
);

router.get("/user/:id", Controller.authLoginGet, Controller.getAllTaskUser);

// rota de autentificação do login de usuário
router.post("/user/auth", Controller.authLogin);

// rota de criar nova task
router.post("/user/:id/createTask", Controller.createTask);

// rota de checkbox
router.get("/user/:id/check/:taskId", Controller.taskCheck);

// rota de excluir task
router.get("/user/:id/deletetask/:taskId", Controller.taskDelete)

module.exports = router;
