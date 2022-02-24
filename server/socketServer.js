const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})

const {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
} = require("./controllers/game")

let game
let players = []

const addPlayer = (user) => {
  !players.some((player) => player._id === user._id) &&
    players.push(user)
}

const getPlayer = (playerId) => {
  return players.find((player) => player._id === playerId)
}

io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("init-game", (newGame) => {
    game = JSON.parse(JSON.stringify(newGame))
    console.log("Nowa gra 1")
    console.log(game) 
    socket.join(game.pin)
  })
  socket.on("add-player", (user, socketId, pin, cb) => {
    console.log(`Student with id: ${user._id} joined a game ${pin}`)
    console.log(game.pin)
    // console.log(user);
    // console.log(socketId);
    if (game.pin === pin) { 
      addPlayer(user)
      cb("correct", game._id) 
      socket.join(game.pin)  
      console.log("Socket with id " + socket.id + " joined room")
      let player = getPlayer(user._id)
      // console.log(player);  
      // console.log("Dodany gracz" + player);
      io.emit("player-added", player) 
    } else { 
      cb("wrong", game._id)
    }
  })
  socket.on("start-game", () => {  
    console.log(players);
    console.log(game); 
    socket.to(game.pin).emit("move-to-game-page", game._id)
    io.emit("host-start-game")
  })
})
 