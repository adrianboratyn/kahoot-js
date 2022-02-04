import React, { useState, useEffect } from "react"
import styles from "./quizCreator.module.css"
import QuestionListItem from "./QuestionListItem/QuestionListItem"
import AnswerInput from "./AnswerInput/AnswerInput"
import triangle from "../../assets/triangle.svg"
import diamond from "../../assets/diamond.svg"
import circle from "../../assets/circle.svg"
import square from "../../assets/square.svg"
import questionType from "../../assets/questionType.svg"
import timer from "../../assets/timer.svg"
import gamePoints from "../../assets/gamePoints.svg"
import answerOptions from "../../assets/answerOptions.svg"
import { useDispatch } from "react-redux"
import { createQuiz, getQuizes } from "../../actions/quiz"
import FileBase from "react-file-base64"

function QuizCreator() {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getQuizes())
  // }, [dispatch])

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

  const [quizData, setQuizData] = useState({
    name: "",
    creatorId: user.result._id,
    backgroundImage: "",
    description: "",
    pointsPerQuestion: 0,
    numberOfQuestions: 1,
    isPublic: true,
    tags: [],
    likesCount: 0,
    questionList: [],
  })

  const [questionData, setQuestionData] = useState({
    questionType: "Quiz",
    pointType: "Standard",
    answerTime: 5,
    backgroundImage: "",
    question: "",
    answerList: [
      { name: "a", body: "", isCorrect: false },
      { name: "b", body: "", isCorrect: false },
      { name: "c", body: "", isCorrect: false },
      { name: "d", body: "", isCorrect: false },
    ],
    questionIndex: 1,
  })
  const [questions, setQuestions] = useState([])
  const [isQuizOptionsVisible, setIsQuizOptionsVisible] = useState(false)
  const [isQuizPublic, setIsQuizPublic] = useState(true)
  const [isQuestionDataSave, setIsQuestionDataSave] = useState(false)
  const [questionImage, setQuestionImage] = useState("")
  const [quizImage, setQuizImage] = useState("")

  const showQuizOptions = () => {
    setIsQuizOptionsVisible(
      (prevIsQuizOptionsVisible) => !prevIsQuizOptionsVisible
    )
  }

  const setCorrectAnswer = (index) => {
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        {
          name: prevState.answerList[index].name,
          body: prevState.answerList[index].body,
          isCorrect: !prevState.answerList[index].isCorrect,
        },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }))

    questionData.answerList[index].isCorrect
      ? setCorrectAnswerCount((prevState) => prevState - 1)
      : setCorrectAnswerCount((prevState) => prevState + 1)
  }

  const handleQuizSubmit = (e) => {
    dispatch(createQuiz(quizData))
  }

  const handleQuizChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value })
  }

  const updateAnswer = (name, body, index) => {
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        {
          name: name,
          body: body,
          isCorrect: prevState.answerList[index].isCorrect,
        },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }))
  }

  const validateAnswerFields = () => {
    return questionData.answerList.every((answer) => answer.body !== "")
  }

  const validateCorrectAnswer = () => {
    return questionData.answerList.some((answer) => answer.isCorrect === true)
  }

  const handleQuestionSubmit = () => {
    console.log("ww")
    if (questionData.question === "") {
      alert("Wpisz treść pytania")
    } else if (!validateAnswerFields()) {
      alert("Wpisz treść odpowiedzi")
    } else if (!validateCorrectAnswer()) {
      alert("Wybierz poprawną odpowiedź")
    } else {
      setIsQuestionDataSave(true)
      setQuestions((prevState) => [
        ...prevState.slice(0, questionData.questionIndex - 1),
        questionData,
        ...prevState.slice(questionData.questionIndex, prevState.length),
      ])
      // it means question already exist and is only updated
      if (
        questions.filter(
          (question) => (question.questionIndex = questionData.questionIndex)
        )
      ) {
        //update list of questions in quizData
        setQuizData((prevState) => ({
          ...prevState,
          questionList: [
            ...prevState.questionList.slice(0, questionData.questionIndex - 1),
            questionData,
            ...prevState.questionList.slice(
              questionData.questionIndex,
              prevState.questionList.length
            ),
          ],
        }))
      } else {
        //add new question
        setQuizData({
          ...quizData,
          questionList: [...quizData.questionList, questionData],
        })
      }
    }
  }

  const handleQuestionRemove = () => {
    let index = questionData.questionIndex
    setQuestions((questions) => [
      ...questions.slice(0, index - 1),
      ...questions.slice(index, questions.length),
    ])
    //update indexes
    questions.forEach((question) => {
      if (question.questionIndex > index) {
        question.questionIndex -= 1
      }
    })

    if (questions.length > 1 && index > 1) {
      showQuestion(index - 1)
    } else if (questions.length > 1 && index === 1) {
      showQuestion(1)
    } else {
      clear()
    }
    setCorrectAnswerCount(0)
  }

  const clear = () => {
    setQuestionData({
      questionType: "Quiz",
      pointType: "Standard",
      answerTime: 5,
      backgroundImage: "",
      question: "",
      answerList: [
        { name: "a", body: "", isCorrect: false },
        { name: "b", body: "", isCorrect: false },
        { name: "c", body: "", isCorrect: false },
        { name: "d", body: "", isCorrect: false },
      ],
      questionIndex: questions.length + 1,
    })
    setQuestionImage("")
  }

  const addNewQuestion = () => {
    console.log(questions)
    setIsQuestionDataSave(false)
    setQuizData({ ...quizData, numberOfQuestions: questions.length })
    clear()
    setIsQuestionTrueFalse(false)
    setCorrectAnswerCount(0)
  }

  const handleQuestionChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value })
  }

  const showQuestion = (index) => {
    var question = questions.filter(
      (question) => question.questionIndex === index
    )
    setQuestionData(question[0])
    setQuestionImage(question[0].backgroundImage)
    question[0].questionType === "True/False"
      ? setIsQuestionTrueFalse(true)
      : setIsQuestionTrueFalse(false)
  }

  const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
  const [maxCorrectAnswerCount, setMaxCorrectAnswerCount] = useState(1)

  const changeMaxCorrectAnswerCount = (e) => {
    setMaxCorrectAnswerCount(e.target.value)
    questionData.answerList.forEach((answer) => (answer.isCorrect = false))
    setCorrectAnswerCount(0)
  }

  const [isQuestionTrueFalse, setIsQuestionTrueFalse] = useState(false)
  const changeQuestionType = () => {
    setIsQuestionTrueFalse((prevState) => !prevState)
    if (!isQuestionTrueFalse) {
      questionData.answerList.splice(2, 2)
    } else {
      questionData.answerList.push({ name: "c", body: "", isCorrect: false })
      questionData.answerList.push({ name: "d", body: "", isCorrect: false })
    }
    questionData.answerList[0].body = "True"
    questionData.answerList[1].body = "False"
    setMaxCorrectAnswerCount(1)
    questionData.answerList.forEach((answer) => (answer.isCorrect = false))
    setCorrectAnswerCount(0)
  }

  return (
    <section className={styles.section}>
      <div className={styles["question-list"]}>
        <div className={styles["quiz-info"]}>
          <h1>
            {quizData.name.length > 0
              ? quizData.name.length > 8
                ? quizData.name.substring(0, 8) + "..."
                : quizData.name
              : "Wprowadź nazwę quizu"}
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
            onClick={() => {
              isQuestionDataSave
                ? addNewQuestion()
                : alert("Zapisz najpierw zmiany w pytaniu")
            }}
            className={styles["add-question-button"]}
          >
            Add question
          </button>
        </div>
      </div>
      <div className={styles["question-creator"]}>
        <input
          type="text"
          name="question"
          value={questionData.question}
          onChange={handleQuestionChange}
          placeholder="Zacznij wpisywać swoje pytanie"
          className={styles["question-name"]}
        />
        <div className={styles["image-container"]}>
          <h3>Znajdź i wstaw zdjęcie</h3>
          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setQuestionData({ ...questionData, backgroundImage: base64 })
                setQuestionImage(base64)
              }}
            />
          </div>
          {questionImage && <img src={questionImage} alt="" />}
        </div>
        <div className={styles["answers-container"]}>
          <div className={styles["answer-field"]}>
            <AnswerInput
              value={questionData.answerList[0].body}
              onChange={(e) => {
                isQuestionTrueFalse
                  ? updateAnswer(e.target.name, "True", 0)
                  : updateAnswer(e.target.name, e.target.value, 0)
              }}
              onClick={() => {
                correctAnswerCount < maxCorrectAnswerCount ||
                questionData.answerList[0].isCorrect
                  ? setCorrectAnswer(0)
                  : alert("Wybrałeś juz poprawną odpowiedź")
              }}
              isAnswerCorrect={questionData.answerList[0].isCorrect}
              svg={triangle}
            />
          </div>
          <div className={styles["answer-field"]}>
            <AnswerInput
              value={questionData.answerList[1].body}
              onChange={(e) => {
                isQuestionTrueFalse
                  ? updateAnswer(e.target.name, "False", 1)
                  : updateAnswer(e.target.name, e.target.value, 1)
              }}
              onClick={() => {
                correctAnswerCount < maxCorrectAnswerCount ||
                questionData.answerList[1].isCorrect
                  ? setCorrectAnswer(1)
                  : alert("Wybrałeś juz poprawną odpowiedź")
              }}
              isAnswerCorrect={questionData.answerList[1].isCorrect}
              svg={diamond}
            />
          </div>
          {!isQuestionTrueFalse && (
            <>
              <div className={styles["answer-field"]}>
                <AnswerInput
                  value={questionData.answerList[2].body}
                  onChange={(e) =>
                    updateAnswer(e.target.name, e.target.value, 2)
                  }
                  onClick={() => {
                    correctAnswerCount < maxCorrectAnswerCount ||
                    questionData.answerList[2].isCorrect
                      ? setCorrectAnswer(2)
                      : alert("Wybrałeś juz poprawną odpowiedź")
                  }}
                  isAnswerCorrect={questionData.answerList[2].isCorrect}
                  svg={circle}
                />
              </div>
              <div className={styles["answer-field"]}>
                <AnswerInput
                  value={questionData.answerList[3].body}
                  onChange={(e) =>
                    updateAnswer(e.target.name, e.target.value, 3)
                  }
                  onClick={() => {
                    correctAnswerCount < maxCorrectAnswerCount ||
                    questionData.answerList[3].isCorrect
                      ? setCorrectAnswer(3)
                      : alert("Wybrałeś juz poprawną odpowiedź")
                  }}
                  isAnswerCorrect={questionData.answerList[3].isCorrect}
                  svg={square}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.options}>
        <div
          style={{ display: isQuizOptionsVisible ? "block" : "none" }}
          className={styles["question-options"]}
        >
          <h1>Tytuł</h1>
          <div className={styles["option-label"]}>
            <label>Title</label>
          </div>
          <input
            value={quizData.name}
            type="text"
            name="name"
            onChange={handleQuizChange}
          />
          <div className={styles["option-label"]}>
            <label>Description</label>
          </div>
          <input
            value={quizData.description}
            type="text"
            name="description"
            onChange={handleQuizChange}
          />
          <div className={styles["option-label"]}>
            <label>Points per question</label>
          </div>
          <input
            type="number"
            min={1}
            value={quizData.pointsPerQuestion}
            name="pointsPerQuestion"
            onChange={handleQuizChange}
          />
          <div className={styles["option-label"]}>
            <label>Dostępność quizu</label>
          </div>
          <div>
            <button
              onClick={() => {
                setIsQuizPublic(true)
                setQuizData({ ...quizData, isPublic: true })
              }}
              className={styles["option-button"]}
              style={{
                backgroundColor: isQuizPublic ? "rgb(19, 104, 206)" : "inherit",
                color: isQuizPublic ? "white" : "rgb(110, 110, 110)",
              }}
            >
              Publiczny
            </button>
            <button
              onClick={() => {
                setIsQuizPublic(false)
                setQuizData({ ...quizData, isPublic: false })
              }}
              className={styles["option-button"]}
              style={{
                backgroundColor: isQuizPublic ? "inherit" : "rgb(19, 104, 206)",
                color: isQuizPublic ? "rgb(110, 110, 110)" : "white",
              }}
            >
              Prywatny
            </button>
          </div>
          <div className={styles["option-label"]}>
            <label>Background Image</label>
          </div>
          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setQuizData({ ...quizData, backgroundImage: base64 })
                setQuizImage(base64)
              }}
            />
          </div>
          {quizImage && (
            <img className={styles["quiz-image"]} src={quizImage} alt="" />
          )}
          <div className={styles["option-label"]}>
            <label>Tagi (oddzielaj przecinkiem)</label>
          </div>
          <input
            type="text"
            value={quizData.tags}
            name="tags"
            onChange={(e) =>
              setQuizData({ ...quizData, tags: e.target.value.split(",") })
            }
          />
          <div>
            <button
              className={styles["option-button"]}
              onClick={handleQuizSubmit}
            >
              Zakończ tworzenie quizu
            </button>
          </div>
        </div>
        <div
          style={{ display: isQuizOptionsVisible ? "none" : "block" }}
          className={styles["question-options"]}
        >
          <div className={styles.option}>
            <div className={styles["option-label"]}>
              <img src={questionType} alt="" />
              <label>Typ pytania</label>
            </div>
            <select
              onChange={(e) => {
                handleQuestionChange(e)
                changeQuestionType()
              }}
              name="questionType"
              value={questionData.questionType}
            >
              <option defaultValue disabled>
                Wybierz typ pytania
              </option>
              <option value="Quiz">Quiz</option>
              <option value="True/False">Prawda/Fałsz</option>
            </select>
          </div>
          <div className={styles.option}>
            <div className={styles["option-label"]}>
              <img src={timer} alt="" />
              <label>Limit czasu</label>
            </div>
            <select
              onChange={handleQuestionChange}
              name="answerTime"
              value={questionData.answerTime}
            >
              <option defaultValue disabled>
                Wybierz limit czasu
              </option>
              <option value={5}>5 sekund</option>
              <option value={10}>10 sekund</option>
              <option value={20}>20 sekund</option>
              <option value={30}>30 sekund</option>
              <option value={60}>1 minuta</option>
              <option value={90}>1 minuta 30 sekund</option>
            </select>
          </div>
          <div className={styles.option}>
            <div className={styles["option-label"]}>
              <img src={gamePoints} alt="" />
              <label>Punkty</label>
            </div>
            <select
              onChange={handleQuestionChange}
              name="pointType"
              value={questionData.pointType}
            >
              <option defaultValue disabled>
                Wybierz sposób przyznania punktów
              </option>
              <option value="Standard">Standard</option>
              <option value="Double">Podwójna ilość</option>
              <option value="BasedOnTime">Na podstawie czasu odpowiedzi</option>
            </select>
          </div>
          <div className={styles.option}>
            <div className={styles["option-label"]}>
              <img src={answerOptions} alt="" />
              <label>Opcje odpowiedzi</label>
            </div>

            <select onChange={changeMaxCorrectAnswerCount}>
              <option defaultValue disabled value="1">
                Wybierz opcje odpowiedzi
              </option>
              <option value="1">Pojedynczy wybór</option>
              <option value="4">Wielokrotny wybór</option>
            </select>
          </div>
          <div>
            <button
              onClick={handleQuestionSubmit}
              className={styles["option-button"]}
            >
              Zapisz zmiany
            </button>
            <button
              onClick={handleQuestionRemove}
              className={styles["option-button"]}
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuizCreator
