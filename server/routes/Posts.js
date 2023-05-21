const express = require('express');
const router = express.Router();

const { Posts, Rating } = require("../models/");
const {validateToken} = require("../middleware/AuthMiddleware")

router.get("/", validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Rating] });
    const ratedPosts = await Rating.findAll({where: {UserId: req.user.id}})
    
    res.json({listOfPosts:listOfPosts, ratedPosts: ratedPosts});
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post);
})

router.post("/", validateToken, async (req, res) => {
    
    const post = req.body;
    post.username = req.user.username;
    
    await Posts.create(post);
    res.json(post);
})

router.delete("/:postId", validateToken, async(req,res) =>{
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
        }
    })
    res.json("Deleted Post")
})

module.exports = router;