const mongoose = require("mongoose");

const myListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    movie_id: {
        type: Number,
        required: true,
    },
    backdrop_path: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
})

const newList = mongoose.models.MyList || mongoose.model("MyList", myListSchema)
module.exports = newList