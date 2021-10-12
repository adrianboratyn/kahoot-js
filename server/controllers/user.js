const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");

const createUser = async (req, res) => {
  const { userType, firstName, lastName, userName, mail, password } = req.body;
  const user = new User({
    userType,
    firstName,
    lastName,
    userName,
    mail,
    password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  //   res.user = user;
  //   next();
  res.json(user);
};

// const getUser = async (req, res) => {
//   res.json(res.user);
// }

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  const { userType, firstName, lastName, userName, mail, password } = req.body;
  const user = new User({
    userType,
    firstName,
    lastName,
    userName,
    mail,
    password,
  });
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  try {
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
