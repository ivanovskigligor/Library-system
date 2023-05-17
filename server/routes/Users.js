const express = require('express');
const router = express.Router();

const { Users } = require("../models/");

const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 8).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
        res.json("succ")
    });
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) return res.json({ error: "User Doesn't Exist" });
  
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) return res.json({ error: "Wrong Username And Password Combination" });
  
      return res.json("Login succ");
    });
  });

module.exports = router;