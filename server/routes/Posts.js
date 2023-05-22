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

router.get("/byUserId/:id", async (req, res) => {
    const id = req.params.id
    const listOfUserPosts = await Posts.findAll({where : {UserId: id}, include: [Rating]})
    res.json(listOfUserPosts);
})

router.post("/", validateToken, async (req, res) => {
    
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id
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

router.put("/:editPost", validateToken, async(req,res) =>{
    const {newTitle, newPostText, id} = req.body;
    await Posts.update({title: newTitle, postText: newPostText}, {where: {id:id}})
    res.json(newTitle);
})


module.exports = router;