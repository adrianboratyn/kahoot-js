import React, { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
import { useHistory } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"

const socket = io("http://localhost:3001")

function JoinGame() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const [isPlayerAdded, setIsPlayerAdded] = useState(false)
  const pinRef = useRef("")
  const history = useHistory()

  useEffect(() => {
    socket.on("connect", () => {
      console.log("new user connected with id " + socket.id)
    })
    socket.on("move-to-game-page", (gameId) => {
      console.log("works")
      history.push(`games/player/${gameId}`)
    })
  }, [])

  const result = (message, id) => {
    if (message === "correct") {
      //addPlayer do playerList in game
      alert("correct")
      setIsPlayerAdded(true)
    } else {
      alert("Podałeś zły pin lub gra nie istnieje")
    }
  }

  const joinGame = () => {
    socket.emit(
      "add-player",
      user.result,
      socket.id,
      pinRef.current.value,
      (message, id) => {
        result(message, id)
      }
    )
  }

  return (
    <div>
      {!isPlayerAdded ? (
        <div>
          <h3>Join Game</h3>
          <h4>Write a pin</h4>
          <label>PIN</label>
          <input type="text" ref={pinRef} />
          <button onClick={joinGame}>Join a Game</button>
        </div>
      ) : (
        <div>
          <h1>You joined the game</h1>
          <h1>Waiting on a host to start the game</h1>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

export default JoinGame
