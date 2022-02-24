import React from "react"
import { useState } from "react"
import WaitingRoom from "../WaitingRoom/WaitingRoom"

function PlayerScreen() {
  const [gameStarted, setGameStarted] = useState(false)
  return (
    <div>
      {!gameStarted && 
      <WaitingRoom />
      }
      <h1>Player</h1>
    </div>
  )
  
}

export default PlayerScreen
