import express from 'express';
import cors from 'cors';

const PORT = 3001;
let id = 0;

const app = express();
app.use(express.json());
app.use(cors());

let quizzes = [
  {
    id: ++id,
    title: 'Cats related questions',
    questions: ['How many cats do you have?', 'What colors they are?'],
  },
  {
    id: ++id,
    title: 'Dogs related questions',
    questions: [
      'How many dogs do you have?',
      'What colors they are?',
      'How they are called?',
    ],
  },
];

app.get('/quizzes', (req, res) => {
  const titles = quizzes.map((quizz) => {
    return {
      title: quizz.title,
      count: quizz.questions.length,
    };
  });
  res.json(titles);
});

app.get('/quizzes/:id', (req, res) => {
  const id = Number(req.params.id);

  const quizDetails = quizzes.filter((quiz) => quiz.id === id);
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
  res.status(201).json(quizzes);
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
