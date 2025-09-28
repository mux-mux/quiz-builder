import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

let id = 0;

const app = express();
app.use(express.json());
app.use(cors());

let quizzes = [
  {
    id: ++id,
    title: 'Cats related questions',
    questions: [
      { id: 1, name: 'How many cats do you have?', type: 'input' },
      { id: 2, name: 'Are they black or white?', type: 'boolean' },
    ],
  },
  {
    id: ++id,
    title: 'Dogs related questions',
    questions: [
      { id: 1, name: 'How many dogs do you have?', type: 'input' },
      { id: 2, name: 'Are they black or brown?', type: 'boolean' },
      { id: 3, name: 'What they like to do?', type: 'checkbox' },
    ],
  },
];

app.get('/quizzes', (req, res) => {
  const titles = quizzes.map((quizz) => {
    return {
      id: quizz.id,
      title: quizz.title,
      count: quizz.questions.length,
    };
  });
  res.json(titles);
});

app.get('/quizzes/:id', (req, res) => {
  const id = Number(req.params.id);

  const quizDetails = quizzes.filter((quiz) => quiz.id === id);
  if (!quizDetails) return res.status(404).json('Quiz not found');

  res.json(quizDetails);
});

app.post('/quizzes', (req, res) => {
  const { title, questions } = req.body;
  const newQuiz = {
    id: ++id,
    title,
    questions,
  };

  quizzes.push(newQuiz);
  console.log(JSON.stringify(quizzes, null, 2));
  res.status(201).json(quizzes);
});

app.delete('/quizzes/:id', (req, res) => {
  const { id } = req.params;
  quizzes = quizzes.filter((quizz) => quizz.id != id);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on: ${BASE_URL}`);
});
