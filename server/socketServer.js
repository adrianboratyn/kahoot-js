const io = require("socket.io")(3001, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

let game 

io.on("connection", socket => {
    // console.log(socket.id);
    socket.on('start-game', (gameData) => {
        console.log(gameData);
    })
    socket.on('add-player', (id, pin) =>{
        //check pin
        console.log(`Student with id: ${id} joined a game`);
    })
})