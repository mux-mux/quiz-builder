import express from 'express';
import cors from 'cors';

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors());

let quizess = [
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    question: 'How many cats do you have?',
    answer: 5,
  },
  {
    id: '7d4ae91d-3b7d-4bad-9bdd-2b0d7b3dcbcd',
    question: 'How many dogs do you have?',
    answer: 1,
  },
];

app.get('/quizess', (req, res) => {
  res.json(quizess);
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
