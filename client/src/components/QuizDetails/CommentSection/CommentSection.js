import React, { useState, useRef } from "react"
import { Typography, TextField, Button } from "@material-ui/core/"
import { useDispatch, useSelector } from "react-redux"

import { commentQuiz } from "../../../actions/quiz"
import useStyles from "./styles"

const CommentSection = ({ quiz }) => {
  const user = JSON.parse(localStorage.getItem("profile"))
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()
  const [comments, setComments] = useState(quiz?.comments)
  const classes = useStyles()
  const commentsRef = useRef()
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)

  const handleComment = async () => {
    const newComments = await dispatch(
      commentQuiz(`${user?.result?.userName}: ${comment}`, quiz._id)
    )

    setComment("")
    setComments(newComments)

    commentsRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            {isLanguageEnglish ? "Comments" : "Komentarze"}
          </Typography>
          {comments?.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(": ")[0]}</strong>
              {comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.userName && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              {isLanguageEnglish ? "Write a comment" : "Napisz komentarz"}
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label={isLanguageEnglish ? "Comment" : "Komentarz"}
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              {isLanguageEnglish ? "Comment" : "Dodaj"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection
