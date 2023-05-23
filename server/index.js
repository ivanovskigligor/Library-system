const express = require('express')
const app = express();
const cors = require('cors')
const db = require('./models')


app.use(express.json());
app.use(cors());

const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);

// change auth to users
const usersRouter = require('./routes/Users');
app.use("/users", usersRouter);

const ratingRouter = require('./routes/Rating');
app.use("/rating", ratingRouter);

db.sequelize.sync().then(()=>{
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    });
});

