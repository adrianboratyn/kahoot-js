import React, { useEffect } from "react"
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { useParams, useHistory } from "react-router-dom"

import { getQuiz, getQuizesBySearch } from "../../actions/quiz"
import useStyles from "./styles"

const Post = () => {
  const { quiz, quizes, isLoading } = useSelector((state) => state.quiz)
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getQuiz(id))
  }, [id])

  useEffect(() => {
    if (quiz) {
      dispatch(getQuizesBySearch({ search: "none", tags: quiz?.tags.join(",") }))
    }
  }, [quiz])

  if (!quiz) return null

  const openPost = (_id) => history.push(`/quizes/${_id}`)

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  const recommendedQuizes = quizes.filter(({ _id }) => _id !== quiz._id)

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {quiz.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {quiz.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {quiz.description}
          </Typography>
          <Typography variant="h6">Created by: {quiz.creatorName}</Typography>
          <Typography variant="body1">
            {moment(quiz.dateCreated).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={quiz.backgroundImage} alt="" />
        </div>
      </div>
      {recommendedQuizes.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedQuizes}>
            {recommendedQuizes.map(
              ({
                name,
                creatorName,
                description,
                likesCount,
                backgroundImage,
                _id,
              }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {creatorName}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {description}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likesCount.length}
                  </Typography>
                  <img src={backgroundImage} alt="" width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default Post
