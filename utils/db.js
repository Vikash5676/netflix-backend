const mongoose = require("mongoose")

const opt = {
    dbName: "netflix_clone",
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const dbConnect = async (uri) => {

    await mongoose.connect(uri, opt).then((res) => {
        console.log('MongoDB connected')
    }).catch(err => {
        console.log(err)
    })

}

module.exports = dbConnect