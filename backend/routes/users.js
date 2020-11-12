const usersRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getAllUsers,
  getSingleUser,
  createUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/usersController");

usersRouter.get(
  "/users",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getAllUsers
);

usersRouter.get(
  "/users/me",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getCurrentUser
);

usersRouter.get(
  "/users/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().alphanum().length(24),
    }),
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getSingleUser
);

usersRouter.patch(
  "/users/me",
  // celebrate({
  //   body: Joi.object().keys({
  //     name: Joi.string().required().min(2).max(30),
  //     about: Joi.string().required().min(2).max(30),
  //   }),
  // }),
  updateProfile
);

usersRouter.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateAvatar
);

module.exports = usersRouter;
