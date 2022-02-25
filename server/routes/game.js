const express = require("express")
const router = express.Router()

const {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
  addPlayer,
} = require("../controllers/game")

router
    .route("/")
    .get(getGames)
    .post(createGame)

router
    .route("/:gameId/players")
    .patch(addPlayer)

router
    .route("/:id")
    .get(getGame)
    .patch(updateGame)
    .delete(deleteGame)

module.exports = router
