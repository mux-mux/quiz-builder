import './App.css';
import { Routes, Route } from 'react-router';
import { QuizList } from './pages/QuizList';
import { ErrorPage } from './pages/ErrorPage';
import QuizDetail from './pages/QuizDetail';

function App() {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <Routes>
        <Route index element={<QuizList />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
        <Route path="*" element={<ErrorPage title="route" />} />
      </Routes>
    </div>
  );
}

export default App;
