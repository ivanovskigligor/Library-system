const express = require('express');
const router = express.Router();

const { Users } = require("../models/");
const {validateToken} = require("../middleware/AuthMiddleware")
const bcrypt = require("bcrypt");

const { sign, } = require("jsonwebtoken")

router.post("/", async (req, res) => {
  const { username, password } = req.body;
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

    const accessToken = sign({ username: user.username, id: user.id }, "somesecret");
    return res.json({token: accessToken, username: username, id:user.id});
  });
});

router.get("/auth", validateToken, (req, res) =>{
  res.json(req.user)
})

module.exports = router;