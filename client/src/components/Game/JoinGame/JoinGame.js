import React, { useEffect, useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress } from "@material-ui/core"
import { createPlayerResult } from "../../../actions/playerResult"
import { addPlayer } from "../../../actions/game"

function JoinGame() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const dispatch = useDispatch()
  const [isPlayerAdded, setIsPlayerAdded] = useState(false)
  const pinRef = useRef("")
  const history = useHistory()
  const socket = useSelector((state) => state.socket.socket)

  useEffect(()=>{
    socket?.on("move-to-game-page", (gameId) => {
      dispatch(
        createPlayerResult({
          playerId: user.result._id,
          gameId: gameId,
          score: 0,
          answers: [],
        })
      )
      history.push(`/games/player/${gameId}`)
    })
  }, [socket, dispatch, history, user.result._id])

  const result = (message, playerId, gameId) => {
    if (message === "correct") {
      dispatch(addPlayer(gameId, playerId))
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
      (message, playerId, gameId) => {
        result(message, playerId, gameId)
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
