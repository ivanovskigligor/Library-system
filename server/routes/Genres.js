const express = require('express');
const router = express.Router();
const { validateToken } = require("../middleware/AuthMiddleware")
const { Genres } = require("../models/");

router.get('/', async (req, res) => {
    const genres = await Genres.findAll();
    res.json({genres: genres})  
  });


module.exports = router;
