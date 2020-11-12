const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
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

require("dotenv").config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.options('*', cors())
app.use(cors());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});



app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});



app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
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
