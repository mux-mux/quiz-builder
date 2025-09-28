import './App.css';
import { Routes, Route } from 'react-router';
import { QuizList } from './pages/QuizList';
import { ErrorPage } from './pages/ErrorPage';
import { QuizDetail } from './pages/QuizDetail';
import { QuizCreation } from './pages/QuizCreation';

function App() {
  return (
    <Routes>
      <Route index element={<QuizList />} />
      <Route path="/quizzes" element={<QuizList />} />
      <Route path="/quizzes/:id" element={<QuizDetail />} />
      <Route path="/create" element={<QuizCreation />} />
      <Route path="*" element={<ErrorPage title="Route" />} />
    </Routes>
  );
}

export default App;
