const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return /^http(s)?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w-./?#&=]+$/gi.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
