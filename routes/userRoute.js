const express = require("express")
const { getUser, addUser, verifyUser } = require("../controllers/userController")
const router = express.Router()


router.route("/getuser").post(getUser)
router.route("/adduser").post(addUser)
router.route("/verifyuser").post(verifyUser)


module.exports = router