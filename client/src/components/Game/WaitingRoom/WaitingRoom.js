import React, { useState, useEffect } from "react"


import { io } from "socket.io-client"

const socket = io("http://localhost:3001")

function WaitingRoom({pin}) {
  
  
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    socket.on("player-added", (player) => {
      console.log(player);
      setPlayerList([ ...playerList, player ])
    })
  }, [playerList])

  


  console.log(playerList)

  const startGame = () =>{
    socket.emit("start-game")
  }
  return (
    <div>
      <h1>Waiting Room</h1>
      <h2>Show PIN to your students: {pin} </h2>
      <div>
        <h2>Player List</h2>
        {playerList.length > 0 ? (
          playerList.map((player) => <h3>{player.userName}</h3>)
        ) : (
          <h2>No players</h2>
        )}
      </div> 
      <button onClick={startGame}>Start a game</button>
    </div>
  )
}

export default WaitingRoom
