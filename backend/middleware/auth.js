const jwt = require("jsonwebtoken");

require("dotenv").config();

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    console.log("jwtkey", JWT_SECRET)
    const err = new Error("Authorization requiredddd - failed to verify token");
    err.statusCode = 401;
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = { auth };
