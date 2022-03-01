const express = require("express")
const router = express.Router()

const {
  createLeaderboard,
  getLeaderboard,
  addPlayerResult,
  updateQuestionLeaderboard,
  updateCurrentLeaderboard,
} = require("../controllers/leaderboard")

router.route("/").post(createLeaderboard)

router.route("/:leaderboardId/playerresult").patch(addPlayerResult)

router
  .route("/:leaderboardId/questionleaderboard")
  .patch(updateQuestionLeaderboard)

router
  .route("/:leaderboardId/currentleaderboard")
  .patch(updateCurrentLeaderboard)

router.route("/:id").get(getLeaderboard)

module.exports = router
