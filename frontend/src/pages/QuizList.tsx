import { NavLink } from 'react-router';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { ErrorPage } from './ErrorPage';
import Trash from '../assets/trash.svg';
import { useMutate } from '../hooks/useMutate';
import Button from '../components/Button';

type QuizzesProps = {
  id: number;
  title: string;
  count: number;
};

export function QuizList() {
  const { data, error, loading, refetch } = useFetch<QuizzesProps[]>(
    `http://localhost:3001/quizzes`
  );
  const { mutate } = useMutate<QuizzesProps[]>(`http://localhost:3001/quizzes`);

  const handleDelete = async (listId: number) => {
    try {
      await mutate('DELETE', undefined, undefined, listId);
      refetch();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage title="Quizzes List" error={error} />;
  if (!data) return <div>No quizzes found.</div>;

  return (
    <div className="flex flex-col space-y-2 mb-6 text-left">
      {data.map(({ id, title, count }) => (
        <div
          key={id}
          className="flex gap-4 justify-between items-center p-4 border border-gray-200 rounded-lg"
        >
          <div>
            <NavLink to={`quizzes/${id}`} className="text-lg font-semibold">
              {title}
            </NavLink>
            <p className="mt-2">{`Questions: ${count}`}</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => handleDelete(id)}
            aria-label={`delete quiz list ${title}?`}
          >
            <img src={Trash} alt="delete task" className="size-4" />
          </Button>
        </div>
      ))}
      <NavLink to="/create" className="m-auto">
        <Button variant="primary" className="mt-4">
          Add new quiz
        </Button>
      </NavLink>
    </div>
  );
}
