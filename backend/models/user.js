const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const NotFoundError = require("../errors/not-found-err");

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "",
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorer",
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^http(s)?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w-./?#&=]+$/gi.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`incorrect email or password`, 401);
      }
      console.log(user);
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotFoundError(`incorrect email or password`, 401);
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
