const router = require("express").Router();
const multer = require("multer");
const SaveProfileImg = require("../middlewares/SaveProfileImg");
const Controller = require("../controller/controller");

const Upload = multer({ storage: SaveProfileImg.storage });

router.get("/", Controller.RootControll);

// rota de registro
router.post(
  "/auth/register",
  Upload.single("image-input"),
  Controller.RegisterUser
);

// rota de login

// rota de pegar todas as tasks

// rota de criar nova task

module.exports = router;
