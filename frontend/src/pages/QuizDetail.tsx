import { useParams } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorPage } from './ErrorPage';
import { BackButton } from '../components/BackButton';
import { InputText } from '../components/InputText';
import { InputRadio } from '../components/InputRadio';
import { InputCheckbox } from '../components/InputCheckbox';

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
      return <InputText />;
    case 'boolean':
      return (
        <div>
          <InputRadio name="answer" label="Yes" />
          <InputRadio name="answer" label="No" />
        </div>
      );
    case 'checkbox':
      return (
        <div>
          <InputCheckbox label="Run" />
          <InputCheckbox label="Swim" />
          <InputCheckbox label="Jump" />
        </div>
      );
    default:
      return <InputText />;
  }
};

export function QuizDetail() {
  const { id } = useParams();

  const { data, error, loading } = useFetch<QuizDetailProps[]>(
    `http://localhost:3001/quizzes/${id}`
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage title="Quiz Detail" error={error} />;
  if (!data) return <div>No quiz found.</div>;

  return (
    <>
      <BackButton>&lArr; Back</BackButton>

      <div>
        {data.map(({ id, title, questions }) => (
          <div key={id} className="space-y-4">
            <h2 className="text-2xl">Quiz name: {title}</h2>
            <h3 className="text-xl">Questions:</h3>
            <ul className=" flex flex-col gap-1 list-disc text-left">
              {questions.map(({ id, name, type }) => (
                <li key={id} className="grid grid-cols-2 items-center gap-2">
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
