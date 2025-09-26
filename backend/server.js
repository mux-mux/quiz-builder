import express from 'express';
import cors from 'cors';

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors());

let quizess = [
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    title: 'Cats related questions',
    questions: ['How many cats do you have?', 'What colors they are?'],
  },
  {
    id: '7d4ae91d-3b7d-4bad-9bdd-2b0d7b3dcbcd',
    title: 'Dogs related questions',
    questions: [
      'How many dogs do you have?',
      'What colors they are?',
      'How they are called?',
    ],
  },
];

app.get('/quizess', (req, res) => {
  const titles = quizess.map((quizz) => {
    return {
      title: quizz.title,
      questionsCount: quizz.questions.length,
    };
  });
  res.json(titles);
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
