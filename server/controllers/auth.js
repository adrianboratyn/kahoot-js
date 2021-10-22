require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const user = await User.findOne({ userName: req.body.userName });
  console.log(user);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken(user.toJSON())
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2h'}
      );
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send("Not allowed");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "25s",
  });
};

//to do middleware
const regenerateAccessToken = (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            console.log(error);
            return res.sendStatus(403);
        }
      const accessToken = generateAccessToken({userName: user.userName})
      res.json({accessToken: accessToken})
    });
}

const logout = (req, res) => {
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    // if (token == null) return res.sendStatus(401);
    // const refreshToken = jwt.sign(token, "", {expiresIn: "1s"})
    // res.send(refreshToken)
}

module.exports = { login, regenerateAccessToken, logout };
