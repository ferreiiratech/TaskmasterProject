const router = require("express").Router();
const multer = require("multer");
const SaveProfileImg = require("../middlewares/SaveProfileImg");
const Controller = require("../controller/controller");

const Upload = multer({ storage: SaveProfileImg.storage });

router.get("/", Controller.RootControll);

// rota de cadastro
router.post("/auth/register", Upload.single("image-input"), Controller.RegisterUser);

router.get("/user/:id", (req, res) => {
  res.send("chegou aqui")
});

// rota de autentificação do login de usuário
router.post("/auth/user", Controller.AuthLogin)

// rota de pegar todas as tasks

// rota de criar nova task

module.exports = router;
