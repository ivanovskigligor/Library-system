const express = require('express');
const router = express.Router();

const { Users } = require("../models/");
const { validateToken } = require("../middleware/AuthMiddleware")
const bcrypt = require("bcrypt");

const { sign, } = require("jsonwebtoken")

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  bcrypt.hash(password, 8).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      email: email
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
    return res.json({ token: accessToken, username: username, id: user.id });
  });
});




router.get("/auth", validateToken, (req, res) => {
  res.json(req.user)
})

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Users.findByPk(id, { attributes: { exclude: ["password"] } });

  res.json(basicInfo)
})

router.put("/editpassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) {
      res.json({ error: "Password doesent match already existing password" });
    }
    bcrypt.hash(newPassword, 8).then((hash) => {
      Users.update({ password: hash }, { where: { username: req.user.username } })
      res.json("succ")
    });

  })
})

router.put("/editusername", validateToken, async (req, res) => {
  const { newUsername } = req.body;
  Users.update({ username: newUsername }, { where: { username: req.user.username } })
  res.json("succ")


})

router.put("/editaboutme", validateToken, async (req, res) => {
  const { newAboutMe } = req.body;
  Users.update({ aboutme: newAboutMe }, { where: { username: req.user.username } })
  res.json("succ")


})

router.put("/changepicture", validateToken, async (req, res) => {
  const {publicId} = req.body;
  await Users.update({ profilephoto: publicId }, { where: { username: req.user.username } })
  res.json("succ")
})

module.exports = router;