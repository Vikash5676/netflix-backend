const newList = require('../models/myListSchema');
const dbConnect = require('../utils/db');
require("dotenv").config()

const getLists = async (req, res) => {
    const data = await JSON.parse(req.body.body);

    try {
        await dbConnect(process.env.MONGODB_URL);
        const resp = await newList.find({ user: data.id })
        return res.status(200).json({ "message": "Successfully fetched", "execution": true, "movies": resp });
    } catch (error) {
        console.log(error)
    }
}

const addMovie = async (req, res) => {
    const data = await JSON.parse(req.body.body);

    try {
        await dbConnect(process.env.MONGODB_URL);
        const resp = await newList.find({ user: data.user, movie_id: data.movie_id })
        if (resp.length > 0) {
            return res.status(208).json({ "message": "This movie is already added", "execution": false });
        }
        const newMovie = new newList(data);
        await newMovie.save()
        return res.status(200).json({ "message": "Movie  Added Successfully", "execution": true });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "message": "something went wrong", "execution": false, "error": error });

    }
}

const deleteMovie = async (req, res) => {
    const data = await req.params.id;
    try {
        await dbConnect(process.env.MONGODB_URL);
        await newList.deleteOne({ _id: data })
        return res.status(200).json({ "message": "Movie Deleted Successfully", "execution": true });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "message": "something went wrong", "execution": false, "error": error });
    }
}

module.exports = { getLists, addMovie, deleteMovie }