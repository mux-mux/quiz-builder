import { NavLink } from 'react-router';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { ErrorPage } from './ErrorPage';

type QuizzesProps = {
  id: number;
  title: string;
  count: number;
};

export function QuizList() {
  const { data, error, loading } = useFetch<QuizzesProps[]>(
    `http://localhost:3001/quizzes`
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage title="Quizzes List" error={error} />;
  if (!data) return <div>No quizzes found.</div>;

  return (
    <div className="flex flex-col space-y-4 mb-6">
      {data.map(({ id, title, count }) => (
        <div key={id} className="p-4 border border-gray-200 rounded-lg">
          <NavLink to={`quizzes/${id}`} className="text-lg font-semibold">
            {title}
          </NavLink>
          <p className="mt-2">{count}</p>
        </div>
      ))}
    </div>
  );
}
