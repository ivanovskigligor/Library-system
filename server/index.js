const express = require('express')
const app = express();
const cors = require('cors')
const db = require('./models')
require("dotenv").config();
const path = require("path")

app.use(express.json());
app.use(cors({
	origin:["http://88.200.63.148:5060"],
	methods:["GET","POST"],
	credentials:true
}));

app.use(express.static(path.join(__dirname, "build")))

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"))
})

const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);

const usersRouter = require('./routes/Users');
app.use("/users", usersRouter);

const ratingRouter = require('./routes/Rating');
app.use("/rating", ratingRouter);

const genresRouter = require('./routes/Genres');
app.use("/genres", genresRouter);

db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT || 3001, () => {
        console.log("Server running on port 3001")
    });
}).catch((error) =>{
    console.log(error)
})

