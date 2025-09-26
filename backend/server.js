import express from 'express';
import cors from 'cors';

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors());

let quizzes = [
  {
    id: 0,
    title: 'Cats related questions',
    questions: ['How many cats do you have?', 'What colors they are?'],
  },
  {
    id: 1,
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
      questionsCount: quizz.questions.length,
    };
  });
  res.json(titles);
});

app.get('/quizzes/:id', (req, res) => {
  const id = Number(req.params.id);

  const quizzesDetails = quizzes.filter((quiz) => quiz.id === id);
  res.json(quizzesDetails);
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
