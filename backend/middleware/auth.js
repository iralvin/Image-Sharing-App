const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/not-found-err");

require("dotenv").config();

const auth = (req, res, next) => {
  console.log("a");
  // console.log("req", req)
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;

  console.log(req.headers);
  console.log(JWT_SECRET);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("failed authorization");
    return res.status(401).send({ message: "authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log("payload", payload);
  } catch (e) {
    console.log("failed to get payload");
    const err = new Error("Authorization requiredddd");
    err.statusCode = 401;
    next(err);
  }

  console.log("b");

  req.user = payload;
  console.log("req.user", req.user);
  next();
};

module.exports = { auth };
