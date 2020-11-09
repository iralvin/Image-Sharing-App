const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const { celebrate, Joi, errors } = require("celebrate");

const { auth } = require("./middleware/auth");
const { requestLogger, errorLogger } = require("./middleware/logger");

const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");
const pageNotFoundRouter = require("./routes/pageNotFound");

const {
  login,
  createUser,
  getCurrentUser,
} = require("./controllers/usersController");
const { join } = require("path");

require("dotenv").config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
// app.use('/api', require('../backend'));


app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   req.user = {
//     _id: "5f7e67f242385d085828d117",
//   };

//   next();
// });

app.use(requestLogger);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
// app.get("/users/me", getCurrentUser);

app.use(auth);

app.use("/", usersRouter);

app.use("/", cardsRouter);
app.use("/", pageNotFoundRouter);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // check the status and display a message based on it
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
