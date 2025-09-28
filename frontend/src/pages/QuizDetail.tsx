import { useParams, useNavigate } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorPage } from './ErrorPage';

type Question = {
  id: number;
  name: string;
  type: string;
};

type QuizDetailProps = {
  id: number;
  title: string;
  questions: Question[];
};

const getType = (type: string) => {
  switch (type) {
    case 'input':
      return (
        <input type="text" className="border rounded border-gray-200 px-2" />
      );
    case 'boolean':
      return (
        <div>
          <input type="radio" name="answer" value="Yes" id="answer-yes" />
          <label htmlFor="answer-yes">Yes</label>
          <input type="radio" name="answer" value="No" id="answer-no" />
          <label htmlFor="answer-no">No</label>
        </div>
      );
    case 'checkbox':
      return (
        <div>
          <input type="checkbox" id="answer-run" name="run" />
          <label htmlFor="answer-run">Run</label>
          <input type="checkbox" id="answer-swim" name="swim" />
          <label htmlFor="answer-swim">Swim</label>
          <input type="checkbox" id="answer-jump" name="jump" />
          <label htmlFor="answer-jump">Jump</label>
        </div>
      );
    default:
      <input type="text" className="border rounded border-gray-200 px-2" />;
  }
};

export function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading } = useFetch<QuizDetailProps[]>(
    `http://localhost:3001/quizzes/${id}`
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage title="Quiz Detail" error={error} />;
  if (!data) return <div>No quiz found.</div>;

  return (
    <>
      <button onClick={() => navigate(-1)} className="m-auto my-8">
        Back
      </button>

      <div>
        {data.map(({ id, title, questions }) => (
          <div key={id} className="space-y-4">
            <h2 className="text-2xl">Quiz name: {title}</h2>
            <h3 className="text-xl">Questions:</h3>
            <ul className=" flex flex-col gap-1 list-disc text-left">
              {questions.map(({ id, name, type }) => (
                <li key={id} className="grid grid-cols-2 gap-2">
                  {name} {getType(type)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
