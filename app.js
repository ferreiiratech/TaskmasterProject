const express = require("express");
const path = require("path");
const session = require("express-session");
const conectToDB = require("./src/database/db");
const routes = require("./src/router/router");
const secretSession = process.env.SECRET;

conectToDB();
const app = express();

app.use(express.urlencoded({ extended: true }));

// config session
app.use(
  session({
    secret: secretSession,
    cookie: { path: "/user", _expires: 1000000 },
  })
);

// Config da pasta "views" e do motor de visualização
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// config local arquivos frontend
app.use(express.static(path.join(__dirname, "src/public")));
app.use(express.static(path.join(__dirname, "/")));

// config json response
app.use(express.json());

// config rotas
app.use(routes);

module.exports = app;
