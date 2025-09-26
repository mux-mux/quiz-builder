import { useParams, useNavigate } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorPage } from './ErrorPage';

type QuizDetailProps = {
  id: number;
  title: string;
  questions: string[];
};

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading } = useFetch<QuizDetailProps[]>(
    `http://localhost:3001/quizzes/${id}`
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage title="Quiz Detal" error={error} />;
  if (!data) return <div>No quiz found.</div>;

  return (
    <div className="text-left">
      {data.map(({ id, title, questions }) => (
        <div key={id} className="space-y-4">
          <h2 className="text-2xl">{title}</h2>
          <ul className="list-disc">
            {questions.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="text-center">
        <button onClick={() => navigate(-1)} className="mt-8">
          Back
        </button>
      </div>
    </div>
  );
};

export default QuizDetail;
