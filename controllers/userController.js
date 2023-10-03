const bcrypt = require('bcrypt');
const dbConnect = require('../utils/db');
const newUser = require('../models/userSchema');
require("dotenv").config()


const getUser = async (req, res) => {
    const data = await JSON.parse(req.body.body)
    try {
        await dbConnect(process.env.MONGODB_URL)
        const user = await newUser.find({ email: data.email })
        if (data.password.length > 0 && user.length > 0) {
            const comparePassword = new Promise((resolve, reject) => {
                bcrypt.compare(data.password, user[0]?.password, function (err, hash) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(hash)
                    }
                })
            })
            const verify_user = await comparePassword
            return res.status(200).json({ "message": user.length > 0 ? true : false, "token": verify_user ? user[0]?.password : null })
        }
        return res.status(200).json({ "message": user.length > 0 ? true : false, "token": data.password === "" ? null : user[0]?.password })
    } catch (error) {
        return res.status(404).json(error)
    }
}




const addUser = async (req, res) => {
    const data = await JSON.parse(req.body.body)
    const hashPassword = new Promise((resolve, reject) => {
        bcrypt.hash(data.password, 10, function (err, hash) {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        })
    })
    const hashed_password = await hashPassword

    try {
        await dbConnect(process.env.MONGODB_URL)
        const user = new newUser({
            email: data.email,
            password: hashed_password
        })

        const saved_user = await user.save()
        return res.status(200).json({ "message": saved_user?.email?.length > 0 ? true : false })
    } catch (error) {
        return res.status(404).json({ "message": false })
    }
}

const verifyUser = async (req, res) => {
    const data = await req.body
    try {
        await dbConnect(process.env.MONGODB_URL)
        const user = await newUser.find({ password: data.token })
        return res.status(200).json({ "message": user.length > 0 ? true : false, "user": String(user[0]._id) })
    } catch (error) {
        return res.status(404).json({ "error": error, "message": false })
    }
}


module.exports = { getUser, addUser, verifyUser }