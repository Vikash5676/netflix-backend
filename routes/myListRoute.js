const express = require("express")
const { getLists, addMovie, deleteMovie } = require("../controllers/myListController")
const MyListrouter = express.Router()


MyListrouter.route("/all-list").post(getLists)
MyListrouter.route("/add-movie").post(addMovie)
MyListrouter.route("/delete-movie/:id").delete(deleteMovie)


module.exports = MyListrouter