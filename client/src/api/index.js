import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:1000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).accessToken
    }`;
  }
  return req;
});

export const fetchUsers = () => API.get("/users");
export const createUser = (newUser) => API.post("/users", newUser);
export const updateUser = (id, updatedUser) =>
  API.patch(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const fetchQuizes = () => API.get("/quizes");
export const fetchQuestions = (quizId) => API.get(`/quizes/${quizId}`);
export const createQuiz = (newQuiz) => API.post("/quizes", newQuiz);
export const createQuestion = (quizId, newQuestion) =>
  API.post(`/quizes/${quizId}/questions`, newQuestion);
export const updateQuestion = (quizId, questionId, updatedQuestion) =>
  API.patch(`/quizes/${quizId}/questions/${questionId}`, updatedQuestion);
export const updateQuiz = (id, updatedQuiz) =>
  API.patch(`/quizes/${id}`, updatedQuiz);

const AUTH_API = axios.create({ baseURL: "http://localhost:4000/api/auth" });

export const login = (formData) => AUTH_API.post("/login", formData);
export const register = (formData) => AUTH_API.post("/register", formData);
