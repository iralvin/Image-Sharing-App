const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const NotFoundError = require("../errors/not-found-err");
const User = require("../models/user");
const { NODE_ENV, JWT_SECRET } = process.env;

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      if (!data) {
        throw new NotFoundError("Failed to retrieve users");
      }
      res.send(data);
    })
    .catch(next);
};

const getSingleUser = (req, res, next) => {
  const { id } = req.params;

  User.findOne({ _id: id })

    .then((user) => {
      if (!user) {
        throw new NotFoundError(`User ID ${id} not found`, 404);
      }

      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!email || !password) {
    throw new NotFoundError(`Email and password must not be empty`, 400);
  }
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        if (!user) {
          throw new NotFoundError(`Failed to create new user`, 400);
        }
        res.send(user);
      })
      .catch(next);
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );

      res.cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });

      res.send({ token, message: "successfully created token" });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Failed to find current user", 404);
      }
      return res.send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Failed to update user profile", 400);
      }
      res.send(user);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Failed to update user avatar", 400);
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  login,
  getCurrentUser,
  updateProfile,
  updateAvatar,
};
