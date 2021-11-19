import React, { useState, useEffect } from "react"
import styles from "./quizCreator.module.css"
import QuestionListItem from "./QuestionListItem/QuestionListItem"
import img6 from "../../assets/img6.svg"
import { useDispatch, useSelector } from "react-redux"
import { createQuiz, getQuizes, updateQuiz } from "../../actions/quiz"
import { updateQuestion } from "../../api"

function QuizCreator() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getQuizes())
  }, [dispatch])

  const quizes = useSelector((state) => state.quiz)
  // console.log(quizes)

  const [quizData, setQuizData] = useState({
    name: "",
    creatorId: "6167e40536af49570b38433f",
    backgroundImage: "",
    description: "",
    pointsPerQuestion: 0,
    questionList: [],
  })
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [questionData, setQuestionData] = useState({
    questionType: "",
    pointType: "",
    answerTime: 0,
    backgroundImage: "",
    question: "",
    answerList: [],
    questionIndex: 0,
    // correctAnswersList: [],
  })
  const [firstAnswer, setFirstAnswer] = useState("")
  const [secondAnswer, setSecondAnswer] = useState("")
  const [thirdAnswer, setThirdAnswer] = useState("")
  const [fourthAnswer, setFourthAnswer] = useState("")

  // const [answers, setAnswers] = useState([])
  const [questions, setQuestions] = useState([])
  const [number, setNumber] = useState(1)
  const [isQuizOptionsVisible, setIsQuizOptionsVisible] = useState(false)
  const [isQuestionDataSave, setIsQuestionDataSave] = useState(false)
  const [isQuestionUpdated, setIsQuestionUpdated] = useState(false)

  useEffect(() => {
    setQuestionData({ ...questionData, questionIndex: number })
  }, [number])

  const showQuizOptions = () => {
    setIsQuizOptionsVisible(
      (prevIsQuizOptionsVisible) => !prevIsQuizOptionsVisible
    )
  }

  const handleQuizSubmit = (e) => {
    dispatch(createQuiz(quizData))
  }

  const handleQuizChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value })
    // console.log(quizData);
  }

  const addAnswer = (name, body) => {
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [...prevState.answerList, { name: name, body: body }],
    }))
  }

  const updateAnswer = (name, body, index) => {
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        { name: name, body: body },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }))
    // setArray((a) => [
    //   ...a.slice(0, index),
    //   newElement,
    //   ...a.slice(index + 1, a.length),
    // ]);
    // setArray((a) => [...a, element]);
  }
  useEffect(() => {
    if (isQuestionUpdated === true) {
      setQuestions((prevState) => [
        ...prevState.slice(0, questionData.questionIndex - 1),
        questionData,
        ...prevState.slice(questionData.questionIndex, prevState.length),
      ])
    }
  }, [isQuestionUpdated])

  const handleQuestionSubmit = () => {
    console.log(questionData.answerList.length)
    if (questionData.answerList.length === 0) {
      addAnswer("a", firstAnswer)
      addAnswer("b", secondAnswer)
      addAnswer("c", thirdAnswer)
      addAnswer("d", fourthAnswer)
    } else {
      updateAnswer("a", firstAnswer, 0)
      updateAnswer("b", secondAnswer, 1)
      updateAnswer("c", thirdAnswer, 2)
      updateAnswer("d", fourthAnswer, 3)
      setIsQuestionUpdated(true)
    }
    setIsQuestionDataSave(true)
  }

  const clear = () => {
    setQuestionData({
      questionType: "",
      pointType: "",
      answerTime: 0,
      backgroundImage: "",
      question: "",
      answerList: [],
    })
    setFirstAnswer("")
    setSecondAnswer("")
    setThirdAnswer("")
    setFourthAnswer("")
  }

  const addNewQuestion = () => {
    if (isQuestionUpdated === false) {
      setQuestions((a) => [...a, questionData])
      setNumber((prevNumber) => prevNumber + 1)
    }
    setIsQuestionUpdated(false)
    setIsQuestionDataSave(false)
    console.log(questionData.questionIndex)
    setQuizData({
      ...quizData,
      questionList: [...quizData.questionList, questionData],
    })
    clear()
  }

  const handleQuestionChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value })
  }

  const showQuestion = (index) => {
    var q = questions.filter((question) => question.questionIndex === index)
    console.log(q[0])
    setQuestionData(q[0])
    setFirstAnswer(q[0].answerList[0].body)
    setSecondAnswer(q[0].answerList[1].body)
    setThirdAnswer(q[0].answerList[2].body)
    setFourthAnswer(q[0].answerList[3].body)
  }

  return (
    <section className={styles.section}>
      <div className={styles["question-list"]}>
        <div className={styles["quiz-info"]}>
          <h1>
            {quizData.name.length > 0 ? quizData.name : "Wprowadź nazwę quizu"}
          </h1>
          <button
            className={styles["quiz-info-button"]}
            onClick={showQuizOptions}
          >
            Ustawienia
          </button>
        </div>
        <div className={styles["question-list-container"]}>
          {questions.length > 0 &&
            questions.map((question) => (
              <QuestionListItem
                // onClick={() => showQuestion(question.name)}
                onClick={() => showQuestion(question.questionIndex)}
                key={question.questionIndex}
                number={question.questionIndex}
                type={question.questionType}
                name={question.question}
                time={question.answerTime}
                image={question.backgroundImage}
              />
            ))}

          <button
            style={{
              pointerEvents: isQuestionDataSave ? "auto" : "none",
            }}
            onClick={addNewQuestion}
            className={styles["add-question-button"]}
          >
            Add question
          </button>
          {/* <!-- nie da się kliknąć dopóki nie skończy się obowiązkowych inputów z pytania --> */}
        </div>
      </div>
      <div className={styles["question-creator"]}>
        {/* <!-- title --> */}
        <input
          type="text"
          name="question"
          value={questionData.question}
          onChange={handleQuestionChange}
          placeholder="Zacznij wpisywać swoje pytanie"
          className={styles["question-name"]}
        />
        {/* <!-- background image --> */}
        <div className={styles["image-container"]}>
          <h3>Znajdź i wstaw zdjęcie</h3>
          {/* <!-- input do dodawania zdjęcia --> */}
          <input
            name="backgroundImage"
            value={questionData.backgroundImage}
            onChange={handleQuestionChange}
            type="text"
          />
          <button className={styles["add-image-button"]}>+</button>
        </div>
        <div className={styles["answers-container"]}>
          {/* <!-- inputy z odpwiedziami --> */}
          <div className={styles["answer-field"]}>
            <svg
              id="TRIANGLE"
              data-functional-selector="icon"
              viewBox="0 0 32 32"
              focusable="false"
              stroke="rgba(0, 0, 0, 0.15)"
              strokeWidth="1.3px"
              style={{ paintOrder: "stroke" }}
            >
              <path
                d="M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z"
                style={{ fill: "inherit" }}
              ></path>
            </svg>
            <input
              type="text"
              value={firstAnswer}
              onChange={(e) => setFirstAnswer(e.target.value)}
              name="a"
            />
            {/* <!-- checkbox która odpowiedź poprawna --> */}
            <div className={styles["answer-check"]}>
              <img src={img6} alt="" />
            </div>
          </div>
          <div className={styles["answer-field"]}>
            <svg
              id="DIAMOND"
              data-functional-selector="icon"
              viewBox="0 0 32 32"
              focusable="false"
              stroke="rgba(0, 0, 0, 0.15)"
              strokeWidth="1.3px"
              style={{ paintOrder: "stroke" }}
            >
              <path
                d="M4,16.0038341 L16,4 L28,16.0007668 L16,28 L4,16.0038341 Z"
                style={{ fill: "inherit" }}
              ></path>
            </svg>
            <input
              type="text"
              value={secondAnswer}
              onChange={(e) => setSecondAnswer(e.target.value)}
              name="b"
            />
            {/* <!-- checkbox która odpowiedź poprawna --> */}
            <div className={styles["answer-check"]}>
              <img src={img6} alt="" />
            </div>
          </div>
          <div className={styles["answer-field"]}>
            <svg
              id="CIRCLE"
              data-functional-selector="icon"
              viewBox="0 0 32 32"
              focusable="false"
              stroke="rgba(0, 0, 0, 0.15)"
              strokeWidth="1.3px"
              style={{ paintOrder: "stroke" }}
            >
              <path
                d="M16,27 C9.92486775,27 5,22.0751322 5,16 C5,9.92486775 9.92486775,5 16,5 C22.0751322,5 27,9.92486775 27,16 C27,22.0751322 22.0751322,27 16,27 Z"
                style={{ fill: "inherit" }}
              ></path>
            </svg>
            <input
              type="text"
              value={thirdAnswer}
              onChange={(e) => setThirdAnswer(e.target.value)}
              name="c"
            />
            {/* <!-- checkbox która odpowiedź poprawna --> */}
            <div className={styles["answer-check"]}>
              <img src={img6} alt="" />
            </div>
          </div>
          <div className={styles["answer-field"]}>
            <svg
              id="SQUARE"
              data-functional-selector="icon"
              viewBox="0 0 32 32"
              focusable="false"
              stroke="rgba(0, 0, 0, 0.15)"
              strokeWidth="1.3px"
              style={{ paintOrder: "stroke" }}
            >
              <path
                d="M7,7 L25,7 L25,25 L7,25 L7,7 Z"
                style={{ fill: "inherit" }}
              ></path>
            </svg>
            <input
              type="text"
              value={fourthAnswer}
              onChange={(e) => setFourthAnswer(e.target.value)}
              name="d"
            />
            {/* <!-- checkbox która odpowiedź poprawna --> */}
            <div className={styles["answer-check"]}>
              <img src={img6} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.options}>
        <div
          style={{ display: isQuizOptionsVisible ? "block" : "none" }}
          className={styles["quiz-options"]}
        >
          <h1>Tytuł</h1>
          <label>Title</label>
          <input
            value={quizData.name}
            type="text"
            name="name"
            onChange={handleQuizChange}
          />
          <label>Description</label>
          <input
            value={quizData.description}
            type="text"
            name="description"
            onChange={handleQuizChange}
          />
          <label>Points per question</label>
          <input
            type="number"
            value={quizData.pointsPerQuestion}
            name="pointsPerQuestion"
            onChange={handleQuizChange}
          />
          <label>Background Image</label>
          <input
            type="text"
            name="backgroundImage"
            value={quizData.backgroundImage}
            onChange={handleQuizChange}
          />
          <button onClick={handleQuizSubmit}>Zakończ tworzenie quizu</button>
          {/* <!-- opis -->
          <!-- obraz tytułowy -->
          <!-- checkbox - prywatny, publiczny --> */}
        </div>
        <div
          style={{ display: isQuizOptionsVisible ? "none" : "block" }}
          className={styles["question-options"]}
        >
          <div className={styles.option}>
            <div className={styles["option-label"]}>
              <svg
                id="change-question-type"
                data-functional-selector="icon"
                viewBox="0 0 32 32"
                focusable="false"
                stroke="none"
                strokeWidth="0"
              >
                <path
                  d="M15.1663167,11 C16.0371581,11 16.8763325,11.1216667 17.6663398,11.3458333 L17.6663398,11.3458333 L17.6663398,13.0966667 C16.8938326,12.8216667 16.0504915,12.6666667 15.1663167,12.6666667 C11.4904494,12.6666667 8.49958851,15.2833333 8.49958851,18.5 C8.49958851,19.7808333 8.97292621,21 9.86793447,22.0266667 C10.1479371,22.3483333 10.140437,22.8291667 9.85043431,23.1416667 L9.85043431,23.1416667 L8.74375743,24.3333333 L15.1663167,24.3333333 C18.8421839,24.3333333 21.8330449,21.7166667 21.8330449,18.5 C21.8330449,18.2166667 21.8022113,17.94 21.7572108,17.6666667 L21.7572108,17.6666667 L23.4455598,17.6666667 C23.4788934,17.9408333 23.4997269,18.2183333 23.4997269,18.5 C23.4997269,22.635 19.7621924,26 15.1663167,26 L15.1663167,26 L6.83290647,26 C6.50123674,26 6.20123397,25.8033333 6.06956609,25.5 C5.93706487,25.1958333 5.99706542,24.8425 6.2220675,24.6 L6.2220675,24.6 L8.14375189,22.53 C7.28374396,21.3266667 6.83290647,19.9458333 6.83290647,18.5 C6.83290647,14.365 10.5712743,11 15.1663167,11 Z M22.6666359,14.3333333 C23.1266402,14.3333333 23.4999769,14.7066667 23.4999769,15.1666667 C23.4999769,15.6275 23.1266402,16 22.6666359,16 C22.2066317,16 21.8332949,15.6275 21.8332949,15.1666667 C21.8332949,14.7066667 22.2066317,14.3333333 22.6666359,14.3333333 Z M22.6666359,6 C24.5049862,6 26,7.495 26,9.33333333 C26,10.8833333 24.9358235,12.19 23.4999769,12.5616667 L23.4999769,13.5 L21.8332949,13.5 L21.8332949,11 L22.6666359,11 C23.5858111,11 24.333318,10.2525 24.333318,9.33333333 C24.333318,8.41416667 23.5858111,7.66666667 22.6666359,7.66666667 C21.7474608,7.66666667 20.9999539,8.41416667 20.9999539,9.33333333 L19.3332718,9.33333333 C19.3332718,7.495 20.8282856,6 22.6666359,6 Z"
                  style={{ fill: "rgb(51, 51, 51)" }}
                ></path>
              </svg>
              <label>Typ pytania</label>
            </div>
            <select onChange={handleQuestionChange} name="questionType">
              {/* <option defaultValue disabled value="0">
                Wybierz typ pytania
              </option> */}
              <option value="Quiz">Quiz</option>
              <option value="True/False">Prawda/Fałsz</option>
            </select>
          </div>
          <div className={styles.option}>
            <div className={styles["option-label"]}>
              <svg
                id="timer"
                data-functional-selector="icon"
                viewBox="0 0 32 32"
                focusable="false"
                stroke="none"
                strokeWidth="0"
              >
                <path
                  d="M16,26 C10.486,26 6,21.515 6,16 C6,10.487 10.486,6 16,6 C21.514,6 26,10.486 26,16 C26,21.515 21.514,26 16,26 Z M16,8 C11.589,8 8,11.589 8,16 C8,20.411 11.589,24 16,24 C20.411,24 24,20.411 24,16 C24,11.589 20.411,8 16,8 Z M15,11 L17,11 L17,18 L15,18 L15,11 Z"
                  style={{ fill: "rgb(51, 51, 51)" }}
                ></path>
              </svg>
              <label>Limit czasu</label>
            </div>
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
          </div>
          <div className={styles.option}>
            <div className={styles["option-label"]}>
              <svg
                id="game-point-multiplier"
                data-functional-selector="icon"
                viewBox="0 0 32 32"
                focusable="false"
                stroke="none"
                strokeWidth="0"
              >
                <path
                  d="M16.4473,22.1055 C16.1663,21.9645 15.8343,21.9645 15.5523,22.1055 L13.2593,23.2515 L13.7773,19.6325 C14.4763,19.8675 15.2223,20.0005 16.0003,20.0005 C16.7773,20.0005 17.5233,19.8675 18.2223,19.6325 L18.7403,23.2515 L16.4473,22.1055 Z M17,11.5 L16,8.5 L15,11.5 L12,11.5 L14,13.5 L13,16.5 L16,14.5 L19,16.5 L18,13.5 L20,11.5 L17,11.5 Z M11.0003,13.0005 C11.0003,10.2425 13.2433,8.0005 16.0003,8.0005 C18.7573,8.0005 21.0003,10.2425 21.0003,13.0005 C21.0003,15.7575 18.7573,18.0005 16.0003,18.0005 C13.2433,18.0005 11.0003,15.7575 11.0003,13.0005 L11.0003,13.0005 Z M20.1033,18.6585 C21.8553,17.3845 23.0003,15.3265 23.0003,13.0005 C23.0003,9.1405 19.8603,6.0005 16.0003,6.0005 C12.1393,6.0005 9.0003,9.1405 9.0003,13.0005 C9.0003,15.3265 10.1443,17.3845 11.8963,18.6585 L11.0103,24.8585 C10.9573,25.2265 11.1143,25.5935 11.4153,25.8115 C11.7183,26.0295 12.1143,26.0605 12.4473,25.8945 L16.0003,24.1185 L19.5523,25.8945 C19.6943,25.9655 19.8473,26.0005 20.0003,26.0005 C20.2063,26.0005 20.4113,25.9365 20.5853,25.8115 C20.8853,25.5935 21.0433,25.2265 20.9893,24.8585 L20.1033,18.6585 Z"
                  style={{ fill: "rgb(51, 51, 51)" }}
                ></path>
              </svg>
              <label>Punkty</label>
            </div>
            <select onChange={handleQuestionChange} name="pointType">
              <option defaultValue disabled value="0">
                Wybierz sposób przyznania punktów
              </option>
              <option value="Standard">Standard</option>
              <option value="Double">Podwójna ilość</option>
              <option value="BasedOnTime">Na podstawie czasu odpowiedzi</option>
            </select>
          </div>
          <div className={styles.option}>
            <div className={styles["option-label"]}>
              <svg
                id="icon58"
                data-functional-selector="icon"
                viewBox="0 0 32 32"
                focusable="false"
                stroke="none"
                strokeWidth="0"
              >
                <path
                  d="M10.375,17.25 C12.7912458,17.25 14.75,19.2087542 14.75,21.625 C14.75,24.0412458 12.7912458,26 10.375,26 C7.95875422,26 6,24.0412458 6,21.625 C6,19.2087542 7.95875422,17.25 10.375,17.25 Z M21.625,17.25 C24.0412458,17.25 26,19.2087542 26,21.625 C26,24.0412458 24.0412458,26 21.625,26 C19.2087542,26 17.25,24.0412458 17.25,21.625 C17.25,19.2087542 19.2087542,17.25 21.625,17.25 Z M21.625,19.75 C20.5894661,19.75 19.75,20.5894661 19.75,21.625 C19.75,22.6605339 20.5894661,23.5 21.625,23.5 C22.6605339,23.5 23.5,22.6605339 23.5,21.625 C23.5,20.5894661 22.6605339,19.75 21.625,19.75 Z M10.375,6 C12.7912458,6 14.75,7.95875422 14.75,10.375 C14.75,12.7912458 12.7912458,14.75 10.375,14.75 C7.95875422,14.75 6,12.7912458 6,10.375 C6,7.95875422 7.95875422,6 10.375,6 Z M21.625,6 C24.0412458,6 26,7.95875422 26,10.375 C26,12.7912458 24.0412458,14.75 21.625,14.75 C19.2087542,14.75 17.25,12.7912458 17.25,10.375 C17.25,7.95875422 19.2087542,6 21.625,6 Z"
                  style={{ fill: "rgb(51, 51, 51)" }}
                ></path>
              </svg>
              <label>Opcje odpowiedzi</label>
            </div>

            <select>
              <option defaultValue disabled value="0">
                Wybierz opcje odpowiedzi
              </option>
              <option value="">Pojedynczy wybór</option>
              <option value="">Wielokrotny wybór</option>
            </select>
          </div>
          <div className={styles["option-buttons"]}>
            <button
              onClick={handleQuestionSubmit}
              className={styles["option-button"]}
            >
              Zapisz zmiany
            </button>
            <button className={styles["option-button"]}>Usuń</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuizCreator
