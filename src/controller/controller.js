const model = require("../model/modelConfig");
const database = require("../database/db");

const rootControll = (req, res) => {
  return res.render("index");
};

module.exports = {
    rootControll,
}
