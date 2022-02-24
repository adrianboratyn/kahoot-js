import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import WaitingRoom from "../WaitingRoom/WaitingRoom"
import { useDispatch, useSelector } from "react-redux"
import { getGame } from "../../../actions/game"
import { getQuiz } from "../../../actions/quiz"
import { io } from "socket.io-client"

const socket = io("http://localhost:3001")

function HostScreen() {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams()
  const { game } = useSelector((state) => state.games)
  const { quiz } = useSelector((state) => state.quiz)
  console.log(game)
  console.log(quiz)

  useEffect(() => {
    dispatch(getGame(id))
  }, [id, dispatch])

  useEffect(() => {
    if (game) {
      dispatch(getQuiz(game.quizId))
    }
  }, [dispatch, game])
 
  useEffect(() => {
    socket.on("host-start-game", ()=>{
      setIsGameStarted(true)
    })
  }, [])

  return (
    <div>
      {!isGameStarted ? (
        <WaitingRoom pin={game?.pin} />
      ) : (
        <div>
          <h1>Game</h1>
        </div>
      )}
    </div>
  )
}

export default HostScreen
