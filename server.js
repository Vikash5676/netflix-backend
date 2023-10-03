const express = require("express")
const app = express();
const cors = require("cors")
const port = process.env.PORT || 8080
const connectToDb = require("./utils/db");
const router = require("./routes/userRoute");
const MyListrouter = require("./routes/myListRoute");
require("dotenv").config()


// middleware
app.use(cors())

// Parse JSON data from the request body
app.use(express.json());

app.use("/api/user", router)
app.use("/api/mylist", MyListrouter)
// end

// routes are here

app.get('/', (req, res) => {
    res.send(`<h1>Hello Express!</h1>`);
});

//   end

// listining to port

const server = async () => {
    try {
        await connectToDb(process.env.MONGODB_URL)
        app.listen(port, () => {

            console.log("app is listining to port : ", port)

        })
    } catch (error) {
        console.log(err)
    }
}




server()


