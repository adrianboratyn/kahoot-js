import React from "react";
import Navbar from "./components2/Navbar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components2/Home/Home";
import Auth from "./components/Auth/Auth";
import Footer from "./components2/Footer/Footer";
import QuizCreator from "./components2/QuizCreator/QuizCreator";
import Quizes from "./components2/Quizes/Quizes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/quizCreator" exact component={QuizCreator} />
        <Route path="/quizes" exact component={Quizes} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
