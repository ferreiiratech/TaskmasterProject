const router = require("express").Router();
const Controller = require("../controller/controller")

router.get("/", Controller.rootControll)

module.exports = router