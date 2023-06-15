const router = require("express").Router();
const multer = require("multer");
const SaveProfileImg = require("../middlewares/SaveProfileImg");
const Controller = require("../controller/controller");

const Upload = multer({ storage: SaveProfileImg.storage });

router.get("/", Controller.RootControll);

// rota de cadastro
router.post("/user/auth/register", Upload.single("image-input"), Controller.RegisterUser);

// inserir um middleware
router.get("/user/:id", Controller.AuthLoginGet, (req, res) => {
  res.send("chegou aqui")
});

// rota de autentificação do login de usuário
router.post("/user/auth", Controller.AuthLogin)

// rota de pegar todas as tasks

// rota de criar nova task

module.exports = router;
