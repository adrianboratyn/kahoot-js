require("dotenv").config()

const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      console.log(error)
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}

const regenerateAccessToken = (req, res, next) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error) {
      console.log(error)
      return res.sendStatus(403)
    }
    const accessToken = generateAccessToken({
      userName: user.userName,
      id: user._id,
    })
    res.json({ accessToken: accessToken })
    req.user = user
    next()
  })
}

module.exports = { authenticateToken, regenerateAccessToken }
