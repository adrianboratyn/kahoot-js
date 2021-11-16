import React, { useState, useEffect } from "react";
import useArray from "./useArray";

function Test() {
  //   const { array, set, push, remove, filter, update, clear } = useArray([
  //     1, 2, 3, 4, 5, 6,
  //   ]);
  const [quizData, setQuizData] = useState({
    name: "",
    creatorId: "6167e40536af49570b38433f",
    backgroundImage: "",
    description: "",
    pointsPerQuestion: 0,
    questionList: [],
  });

  const [questionData, setQuestionData] = useState({
    // questionType: "",
    // pointType: "",
    // answerTime: 0,
    // backgroundImage: "",
    // question: "",
    // answerList: [],
    // correctAnswersList: [],
    questionType: "Quiz",
    pointType: "BasedOnTime",
    backgroundImage: "aa",
    answerTime: 10,
    question: "Co to jest HTML?",
    answerList: [],
  });
  const [firstAnswer, setFirstAnswer] = useState("asd");
  const [secondAnswer, setSecondAnswer] = useState("asd");
  const [thirdAnswer, setThirdAnswer] = useState("asd");
  const [fourthAnswer, setFourthAnswer] = useState("asd");

  const [answers, setAnswers] = useState([
    // { name: "a", body: "WWA" },
    // { name: "b", body: "RZE" },
    // { name: "c", body: "KRK" },
  ]);
  const [questions, setQuestions] = useState([]);
  const handleQuizSubmit = (e) => {
    // if (quiz !== null) {
    //   dispatch(updateQuiz(quiz._id, quizData));
    // } else {
    //   dispatch(createQuiz(quizData));
    //   // setQuiz(quizes.filter((quiz) => quiz.name === quizData.name));
    // }
  };

  const handleQuizChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
    console.log(quizData);
  };
  const handleQuestionChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });

    // setQuestionData({ ...questionData, [e.target.name]: e.target.value });
    console.log(questionData);
  };
  const handleQuestionSubmit = () => {
    // const newAnswer = [...answerList];
    // newAnswer[0] = {
    //   ...newAnswer[0],
    //   body: firstAnswer,
    // };
    // setAnswerList(newAnswer);
  };

  const func = () => {
    // setAnswers((a) => [...a, { name: "d", body: "nowa" }]);
    // setAnswers((a) => [...a, { name: "e", body: "nowe" }]);
    // setQuestionData({ ...questionData, answerList: answers });
    // setQuestionData({
    //   ...questionData,
    //   answerList: { name: "e", body: "nowe" },
    // });

    // setQuestionData({
    //   ...questionData,
    //   answerList: ( {...answerList, [{ name: "e", body: "nowe" }]}),
    // });
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [...prevState.answerList, { name: "e", body: "nowe" }],
    }));

    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [...prevState.answerList, { name: "g", body: "nowe" }],
    }));

    // setQuizData((prevState) => ({
    //   ...prevState,
    //   questionList: {
    //     ...prevState.questionList,
    //     answerList: [
    //       ...prevState.questionList.answerList,
    //       { name: "g", body: "nowe" },
    //     ],
    //   },
    // }));
    // console.log(answers);
    //jedno na raz
    // setQuestionData(questionData => [...questionData.answerList, "c"])
  };

  const func2 = () => {
    // console.log(questionData.answerList);
    // console.log(questionData);
  };

  const func3 = () => {
    // console.log(questionList);
    setQuestions((a) => [...a, questionData]);
  };

  const func4 = () => {
    setQuizData({ ...quizData, questionList: questions });
  };
  console.log(questionData);
  console.log(questions);
  // console.log(quizData);
  // console.log(answers);
  return (
    <div>
      <br />
      <button onClick={func}>LETS GO</button>
      <br />
      <br />
      <button onClick={func2}>CHECK</button>
      <br />
      <br />
      <button onClick={func3}>PART 3</button>
      <br />
      <br />
      <button onClick={func4}>SHOW</button>
      <br />
      <input
        type="text"
        name="question"
        onChange={handleQuestionChange}
        placeholder="Zacznij wpisywać swoje pytanie"
      />
      <h4>Znajdź i wstaw zdjęcie</h4>
      <input
        name="backgroundImage"
        onChange={handleQuestionChange}
        type="text"
      />
      <h4>A</h4>
      <input
        type="text"
        onChange={(e) => {
          setFirstAnswer(e.target.value);
          console.log(firstAnswer);
        }}
        name="a"
      />
      <h4>B</h4>
      <input
        type="text"
        onChange={(e) => setSecondAnswer(...secondAnswer, [e.target.value])}
        name="b"
      />
      <h4>C</h4>
      <input
        type="text"
        onChange={(e) => setThirdAnswer(...thirdAnswer, e.target.value)}
        name="c"
      />
      <h4>D</h4>
      <input
        type="text"
        onChange={(e) => setFourthAnswer(...fourthAnswer, e.target.value)}
        name="d"
      />
      <h4>Points per question</h4>
      <input
        type="number"
        name="pointsPerQuestion"
        onChange={handleQuizChange}
      />
      <h4>backgroundImage</h4>
      <input type="text" name="backgroundImage" onChange={handleQuizChange} />
      <h4>questionType</h4>
      <select onChange={handleQuestionChange} name="questionType">
        {/* <option defaultValue disabled value="0">
                Wybierz typ pytania
              </option> */}
        <option value="Quiz">Quiz</option>
        <option value="True/False">Prawda/Fałsz</option>
      </select>
      <h4>answerTime</h4>
      <select onChange={handleQuestionChange} name="answerTime">
        <option defaultValue disabled value="0">
          Wybierz limit czasu
        </option>
        <option value="5">5 sekund</option>
        <option value="10">10 sekund</option>
        <option value="20">20 sekund</option>
        <option value="30">30 sekund</option>
        <option value="60">1 minuta</option>
        <option value="90">1 minuta 30 sekund</option>
        <option value="120">2 minuty</option>
        <option value="240">4 minuty</option>
      </select>
      <h4>pointType</h4>
      <select onChange={handleQuestionChange} name="pointType">
        <option defaultValue disabled value="0">
          Wybierz sposób przyznania punktów
        </option>
        <option value="Standard">Standard</option>
        <option value="Double">Podwójna ilość</option>
        <option value="BasedOnTime">Na podstawie czasu odpowiedzi</option>
      </select>
      <h4>typ pytania</h4>
      <select>
        <option defaultValue disabled value="0">
          Wybierz opcje odpowiedzi
        </option>
        <option value="">Pojedynczy wybór</option>
        <option value="">Wielokrotny wybór</option>
      </select>
      <br />
      <button onClick={handleQuestionSubmit}>Zapisz zmiany</button>
      {/* <div>
        <p>{questionData.questionType}</p>
        <p>{questionData.pointType}</p>
        <p>{questionData.backgroundImage}</p>
        <p>{questionData.answerTime}</p>
        <p>{questionData.question}</p>
        <p>{questionData.answerList}</p>
      </div> */}
      <div>
        {questions.map((questionData) => (
          <p>{questionData.question}</p>
        ))}
      </div>
    </div>
  );
}

export default Test;
