import React, { useEffect } from "react"
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import Footer from "./components/Footer/Footer"
import QuizCreator from "./components/QuizCreator/QuizCreator"
import Quizes from "./components/Quizes/Quizes"
import MyQuizes from "./components/MyQuizes/MyQuizes"
import QuizDetails from "./components/QuizDetails/QuizDetails"
import HostScreen from "./components/Game/HostScreen/HostScreen"
import PlayerScreen from "./components/Game/PlayerScreen/PlayerScreen"
import JoinGame from "./components/Game/JoinGame/JoinGame"
import { io } from "socket.io-client"
import { useDispatch } from "react-redux"
import { createSocket } from "./actions/socket"

function App() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = io("http://localhost:3001")
    dispatch(createSocket(socket))

    return () => socket.disconnect()
  }, [dispatch])

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={() => (user === null ? <Auth /> : <Redirect to="/" />)} />
        <Route path="/quizes" exact component={Quizes} />
        <Route path="/quizes/search" exact component={Quizes} />
        <Route path="/quizes/:id" exact component={QuizDetails} />
        <Route path="/myquizes/:id" exact component={QuizCreator} />
        <Route path="/games/joingame" exact component={JoinGame} />
        <Route path="/games/host/:id" exact component={HostScreen} />
        <Route path="/games/player/:id" exact component={PlayerScreen} />
        <Route path="/myquizes" exact component={MyQuizes} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
