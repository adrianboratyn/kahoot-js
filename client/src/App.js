import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Footer from "./components/Footer/Footer";
import QuizCreator from "./components/QuizCreator/QuizCreator";
import Quizes from "./components/Quizes/Quizes";
import MyQuizes from "./components/MyQuizes/MyQuizes";
import QuizDetails from "./components/QuizDetails/QuizDetails"

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))
  console.log(user);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/"/>)} />
        <Route path="/quizes" exact component={Quizes} />
        <Route path="/quizes/search" exact component={Quizes} />
        <Route path="/quizes/:id" exact component={QuizDetails} />
        <Route path="/myquizes/:id" exact component={QuizCreator} />
        <Route path="/myquizes" exact component={MyQuizes} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
