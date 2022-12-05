const express = require("express");
const User = require("./user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");
const { isAuth } = require("../../middleware/auth");


router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.post("/postNewUser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    if(newUser.rol === 'user') {
      const created = await newUser.save();
      return res.status(201).json(created);
    } else {
      return res.status(500).json("You are not authorized, get the fuck out");
    }
  } catch (err) {
    return res.status(500).json("Error creating the user");
  }
});

router.put('/edit/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      const user = req.body;

      const userModify = new User(user);
      userModify._id = id;
      const userUpdate = await User.findByIdAndUpdate(id , userModify, {returnOriginal:false});
      return res.status(200).json(userUpdate)
  } catch (error) {
      return next (error);
  }
})

router.post("/login", async (req, res) => {
  try {
    const userDb = await User.findOne({ email: req.body.email });
    if (!userDb) {
      return res.status(404).json("Login error");
    }
    if (bcrypt.compareSync(req.body.password, userDb.password)) {
      const token = generateSign(userDb._id, userDb.email);
      return res.status(200).json({ token, userDb });
    } else {
      return res.status(500).json("Login error");
    }
  } catch (error) {
    return res.status(500).json("Login error", error);
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/checksession", [isAuth], async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
