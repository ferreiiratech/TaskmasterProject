const router = require("express").Router();
const multer = require("multer");
const SaveProfileImg = require("../middlewares/SaveProfileImg");
const Controller = require("../controller/controller");

const Upload = multer({ storage: SaveProfileImg.storage });

router.get("/", Controller.rootControll);

// rota de cadastro
router.post("/user/auth/register", Upload.single("image-input"), Controller.registerUser);

// inserir um middleware
router.get("/user/:id", Controller.authLoginGet, Controller.getAllTaskUser);

// rota de autentificação do login de usuário
router.post("/user/auth", Controller.authLogin)

// rota de criar nova task
router.post("/user/:id/createTask", Controller.createTask)

module.exports = router;
