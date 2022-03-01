import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:1000/api" })

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).accessToken
    }`
  }
  return req
})

export const fetchUsers = () => API.get("/users")
export const createUser = (newUser) => API.post("/users", newUser)
export const updateUser = (id, updatedUser) =>
  API.patch(`/users/${id}`, updatedUser)
export const deleteUser = (id) => API.delete(`/users/${id}`)

export const fetchQuizes = () => API.get("/quizes")
export const fetchPublicQuizes = (page) =>
  API.get(`/quizes/public?page=${page}`)
export const fetchQuizesBySearch = (searchQuery) =>
  API.get(
    `/quizes/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  )
export const fetchTeacherQuizes = (teacherId) =>
  API.get(`/quizes/teacher/${teacherId}`)
export const fetchQuestions = (quizId) => API.get(`/quizes/${quizId}`)
export const createQuiz = (newQuiz) => API.post("/quizes", newQuiz)
export const createQuestion = (quizId, newQuestion) =>
  API.post(`/quizes/${quizId}/questions`, newQuestion)
export const updateQuestion = (quizId, questionId, updatedQuestion) =>
  API.patch(`/quizes/${quizId}/questions/${questionId}`, updatedQuestion)
export const updateQuiz = (id, updatedQuiz) =>
  API.patch(`/quizes/${id}`, updatedQuiz)
export const deleteQuiz = (id) => API.delete(`/quizes/${id}`)
export const likeQuiz = (id) => API.patch(`/quizes/${id}/likeQuiz`)
export const commentQuiz = (comment, id) =>
  API.post(`/quizes/${id}/commentQuiz`, { comment })
export const fetchQuiz = (id) => API.get(`/quizes/${id}`, id)

export const createGame = (newGame) => API.post("/games", newGame)
export const fetchGame = (id) => API.get(`/games/${id}`, id)
export const addPlayer = (gameId, playerId) =>
  API.patch(`/games/${gameId}/players`, { playerId })

export const createPlayerResult = (newPlayerResult) =>
  API.post("/playerResults", newPlayerResult)
export const fetchPlayerResult = (id) => API.get(`/playerResults/${id}`, id)
export const addAnswer = (newAnswer, id) =>
  API.patch(`/playerResults/${id}/answers`, { newAnswer })

export const createLeaderboard = (newLeaderboard) =>
  API.post("/leaderboard", newLeaderboard)
export const fetchLeaderboard = (id) => API.get(`/leaderboard/${id}`, id)
export const addPlayerResult = (playerResult, id) =>
  API.patch(`/leaderboard/${id}/playerresult`, playerResult)
export const updateQuestionLeaderboard = (questionResult, id) =>
  API.patch(`/leaderboard/${id}/questionleaderboard`, questionResult)
export const updateCurrentLeaderboard = (result, id) =>
  API.patch(`/leaderboard/${id}/currentleaderboard`, result)

const AUTH_API = axios.create({ baseURL: "http://localhost:4000/api/auth" })

export const login = (formData) => AUTH_API.post("/login", formData)
export const register = (formData) => AUTH_API.post("/register", formData)
