const { instrument } = require("@socket.io/admin-ui")

const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io/#/sockets"],
  },
})

let game
let players = []


const addPlayer = (userName, socketId) => {
  !players.some((player) => player.socketId === socketId) &&
    players.push({ userName, socketId })
}

const getPlayer = (socketId) => {
  return players.find((player) => player.socketId === socketId)
}

io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {
    console.log("Socket " + socket.id + " was disconnected")
    console.log(reason)
  })
  socket.on("init-game", (newGame) => {
    game = JSON.parse(JSON.stringify(newGame))
    hostId = socket.id
    console.log(
      "Host with id " + socket.id + " started game and joined room: " + game.pin
    )
  })

  socket.on("add-player", (user, socketId, pin, cb) => {
    if (game.pin === pin) {
      addPlayer(user.userName, socketId)
      console.log(game._id)
      cb("correct", user._id, game._id)
      socket.join(game.pin)
      console.log(
        "Student " +
          user.userName +
          " with id " +
          socket.id + 
          " joined room " +
          game.pin
      )
      let player = getPlayer(socketId)
      io.emit("player-added", player)
    } else {
      cb("wrong", game._id)
    }
  })

  socket.on("start-game", (newQuiz) => {
    quiz = JSON.parse(JSON.stringify(newQuiz))
    console.log("Move players to game")
    console.log(game.pin)
    socket.to(game.pin).emit("move-to-game-page", game._id)
  })

  socket.on("question-preview", (cb) => { 
    cb() 
    socket.to(game.pin).emit("host-start-preview")
  }) 

  socket.on("start-question-timer", (time, question, cb) => { 
    console.log(question);
    console.log("Send question " + question.questionIndex + " data to players")
    socket
      .to(game.pin)
      .emit("host-start-question-timer", time, question)
    cb()
  })
})

instrument(io, { auth: false })
