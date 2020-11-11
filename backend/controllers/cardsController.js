const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-err");

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError("Failed to find cards data", 500);
      }
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Failed to find card data", 400);
      }
      res.send({ card });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findOne({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Failed to find card data", 404);
      }
      if (card.owner == req.user._id) {
        Card.deleteOne({ _id: cardId }).then((card) => {
          return res.send({ message: "successfully deleted card" });
        });
      } else {
        throw new NotFoundError("User not authorized to delete card", 404);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Failed to like card", 400);
      }
      res.send(card);
    })
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Failed to unlike card", 400);
      }
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
