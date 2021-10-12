require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const userRouter = require("./routes/user")
app.use('/users', userRouter)

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
