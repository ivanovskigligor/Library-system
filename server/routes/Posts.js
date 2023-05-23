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
router.get("/byFavoriteId/:id", async (req, res) => {
    const id = req.params.id
    const ratings = await Rating.findAll({ where: { UserId: id } });
    
    // Extract the PostIds from the ratings
    const postIds = ratings.map(rating => rating.PostId);
    
    // Find all posts with matching PostIds
    const listOfRatedPosts = await Posts.findAll({ where: { id: postIds }, include: [Rating] });

    res.json(listOfRatedPosts);
})

router.post("/", validateToken, async (req, res) => {
    
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id
    post.GenreId = req.body.genreId
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

router.put("/:editPost", validateToken, async (req,res) =>{
    
    const {newTitle, newPostText, newAuthor, newDescription, id} = req.body;
    Posts.update({title: newTitle, postText: newPostText, author:newAuthor, description:newDescription}, {where: {id: id}})
    
    res.json("post");
})


module.exports = router;