import React, { useEffect, useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress } from "@material-ui/core"
import { createPlayerResult } from "../../../actions/playerResult"
import { addPlayer } from "../../../actions/game"
import styles from "./joinGame.module.css"

function JoinGame() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const dispatch = useDispatch()
  const [isPlayerAdded, setIsPlayerAdded] = useState(false)
  const pinRef = useRef("")
  const history = useHistory()
  const socket = useSelector((state) => state.socket.socket)
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)

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
    <div className={styles.page}>
      {!isPlayerAdded ? (
        <div className={styles.section}>
          <h2>{isLanguageEnglish ? "Join game" : "Dołącz do gry"}</h2>
          <input
            type="text"
            ref={pinRef}
            placeholder={
              isLanguageEnglish ? "Write here a pin" : "Wpisz tutaj pin"
            }
          />
          <button onClick={joinGame}>
            {isLanguageEnglish ? "Send" : "Wyślij"}
          </button>
        </div>
      ) : (
        <div className={styles.section}>
          <h2>
            {isLanguageEnglish ? "You joined the game" : "Dołączyłeś do gry"}
          </h2>
          <h4>
            {isLanguageEnglish ? "Waiting on a host to start the game" : "Zaczekaj na rozpoczęcie gry przez hosta"}
          </h4>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

export default JoinGame
