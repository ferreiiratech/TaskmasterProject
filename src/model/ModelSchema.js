const mongoose = require("mongoose");

// Usuário
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img_profile: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

// tarefas
const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = {
  User,
  Task,
};


// usar quando for criar as rotas, serve para filtrar as tarefas de cada user
// const tasks = await Task.find({ userId: userId });