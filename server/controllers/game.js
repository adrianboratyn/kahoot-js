const mongoose = require("mongoose")
const Game = require("../models/game")
const PlayerResult = require("../models/playerResult")

const createGame = async (req, res) => {
  const { quizId, isLive, playerList, playerResultList, pin } = req.body

  const game = new Game({
    hostId: req.user.id,
    quizId,
    date: new Date().toISOString(),
    pin,
    isLive,
    playerList,
    playerResultList,
  })

  try {
    const newGame = await game.save()
    res.status(201).json(newGame)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getGames = async (req, res) => {
  try {
    const games = await Game.find()
    res.status(200).send(games)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getGame = async (req, res) => {
  let game
  try {
    game = await Game.findById(req.params.id)
    if (game == null) {
      return res.status(404).json({ message: "Game not found" })
    }
    res.json(game)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteGame = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No game with id: ${id}`)
  }

  try {
    await Game.findByIdAndRemove(id)
    res.json({ message: "Game deleted succesfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateGame = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No game with id: ${id}`)
  }

  const { hostId, quizId, pin, isLive, playerList, date } = req.body

  const playerResultList = await PlayerResult.find({ gameId: id })
  console.log(playerResultList)
  const game = new Game({
    _id: id,
    hostId,
    quizId,
    pin,
    isLive,
    playerList,
    date,
    playerResultList,
  })

  try {
    const updatedGame = await Game.findByIdAndUpdate(id, game, { new: true })
    res.json(updatedGame)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const addPlayer = async (req, res) => {
  const { gameId } = req.params
  const { playerId } = req.body

  let game
  try {
    game = await Game.findById(gameId)
    game.playerList.push(playerId)
    const updatedGame = await game.save()
    res.send(updatedGame)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { createGame, getGames, getGame, deleteGame, updateGame, addPlayer }
