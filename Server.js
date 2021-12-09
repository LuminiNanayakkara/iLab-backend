const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Question = require("./models/Question");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/get-questions", async (req, res, next) => {
  try {
    const data = await Question.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }

  console.log(data);
});

app.post("/add-question", async (req, res, next) => {
  if (!req.body) {
    return;
  }
  const { question, category } = req.body;
  const newQuestion = new Question({
    question: question,
    category: category,
    status: "Published",
  });

  try {
    const result = await newQuestion.save();
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

const port = process.env.PORT || 9090;
mongoose
  .connect(
    "mongodb+srv://admin:admin@ilabs.cdbtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useNewUrlParser: true,
      // useFindAndModify: true,
    }
  )
  .then(() => {
    console.log("Database Estabilished");
    app.listen(port, () => {
      console.log("Server Started ", 9090);
    });
  })
  .catch((err) => {
    console.log(err);
  });
