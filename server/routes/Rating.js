const express = require('express');
const router = express.Router();

const { Rating } = require("../models/");
const { validateToken } = require("../middleware/AuthMiddleware")



router.post("/", validateToken, async (req, res) => {
    const { PostId } = req.body;
    const UserId = req.user.id;

    const rated = await Rating.findOne(
        {where: {PostId : PostId, UserId: UserId}})
    
        if(!rated){
        await Rating.create({ PostId: PostId, UserId: UserId });
        res.json({ratted: true})
    } else {
        await Rating.destroy({
            where: {
                PostId: PostId,
                UserId: UserId 
            }
        })
        res.json({ratted: false})
    }

})



module.exports = router;