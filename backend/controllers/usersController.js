const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const NotFoundError = require("../errors/not-found-err");
const User = require("../models/user");

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
  console.log("id", id);

  User.findOne({ _id: id })

    .then((user) => {
      console.log(" user", user);

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
        res.send({ user });
      })
      .catch(next);
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  // User.findOne({ email })
  //   .select("+password")
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      console.log(JWT_SECRET);

      const token = jwt.sign(
        // { _id: "d285e3dceed844f902650f40" },
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );

      console.log("token", token);
      console.log("user", user);

      res.send(token);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  console.log("getting current user");
  console.log("_id", _id);
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Failed to find current user", 404);
      }
      console.log("found current user");
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
