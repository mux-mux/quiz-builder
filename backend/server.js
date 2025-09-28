import express from 'express';
import cors from 'cors';
import knex from 'knex';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

const db = knex({
  client: 'pg',
  connection: { connectionString: process.env.DATABASE_URL },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('server is working'));

app.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await db('quizzes')
      .leftJoin('questions', 'quizzes.id', 'questions.quiz_id')
      .groupBy('quizzes.id')
      .select('quizzes.id', 'quizzes.title')
      .count('questions.id as count');

    res.json(quizzes);
  } catch (error) {
    handleError(error);
  }
});

app.get('/quizzes/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const quiz = await db('quizzes').where({ id }).first();

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questions = await db('questions')
      .where({ quiz_id: id })
      .select('id', 'name', 'type');

    res.json([
      {
        id: quiz.id,
        title: quiz.title,
        questions: questions,
      },
    ]);
  } catch (error) {
    handleError(error);
  }
});

app.post('/quizzes', async (req, res) => {
  const { title, questions } = req.body;

  try {
    const [quiz] = await db('quizzes')
      .insert({ title })
      .returning(['id', 'title']);

    if (questions && questions.length > 0) {
      const questionsToInsert = questions.map((q) => ({
        quiz_id: quiz.id,
        name: q.name,
        type: q.type,
      }));

      await db('questions').insert(questionsToInsert);
    }

    const insertedQuestions = await db('questions')
      .where({ quiz_id: quiz.id })
      .select('id', 'name', 'type');

    res.status(201).json({
      id: quiz.id,
      title: quiz.title,
      questions: insertedQuestions,
    });
  } catch (error) {
    handleError(error);
  }
});

app.delete('/quizzes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db('quizzes').where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.status(204).end();
  } catch (error) {
    handleError(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on: ${BASE_URL}`);
});

const handleError = (err) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
};
