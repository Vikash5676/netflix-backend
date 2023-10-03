const newList = require('../models/myListSchema');
const dbConnect = require('../utils/db');
require("dotenv").config()

const getLists = async (req, res) => {
    const data = await JSON.parse(req.body.body);

    try {
        await dbConnect();
        const res = await newList.find({ user: data.id })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

const addMovie = async (req, res) => {
    const data = await JSON.parse(req.body.body);

    try {
        await dbConnect();
        const res = await newList.find({ user: data.user, movie_id: data.movie_id })
        if (res.length > 0) {
            console.log("this movie is already added")
            return;
        }
        const newMovie = new newList(data);
        await newMovie.save()
        return;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getLists, addMovie }