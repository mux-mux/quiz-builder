import { useState, type FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMutate } from '../hooks/useMutate';
import { BackButton } from '../components/BackButton';
import Button from '../components/Button';
import { InputText } from '../components/InputText';
import Alert from '../components/Alert';
import { InputSelect } from '../components/InputSelect';
import Trash from '../assets/trash.svg';
import { type StatusTypes } from '../components/Alert';

type QuizProps = {
  title: string;
  questions: string[];
};

type QuestionProps = {
  id: string;
  name: string;
  type: Types;
};

type AlertProps = {
  show: boolean;
  status: StatusTypes;
  message: string;
};

type Types = 'input' | 'boolean' | 'checkbox';

const ALERT_INITIAL: AlertProps = {
  show: false,
  status: 'info' as StatusTypes,
  message: '',
};

export function QuizCreation() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [alert, setAlert] = useState<AlertProps>(ALERT_INITIAL);
  const [type, setType] = useState<Types>('input');
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const { loading, error, mutate } = useMutate<QuizProps>(
    'http://localhost:3001/quizzes'
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length === 0) {
      setAlert({
        show: true,
        status: 'info',
        message: 'Please add a quiz title',
      });
      return;
    }
    if (questions.length === 0) {
      setAlert({
        show: true,
        status: 'info',
        message: 'Please add at leaset one question',
      });
      return;
    }

    try {
      const handleCreate = async () =>
        await mutate('POST', { title, questions });

      if (!loading && !error) {
        setAlert({
          show: true,
          status: 'success',
          message: 'New quizz has been succesfully created',
        });
      }
      setTitle('');
      setQuestions([]);
      handleCreate();
    } catch (error) {
      setAlert({
        show: true,
        status: 'failed',
        message: `Task creation failed: ${error}`,
      });
    }
  };

  const handleDelete = (idToDelete: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== idToDelete));
  };

  const handleAddQuestion = () => {
    if (question.length === 0) {
      setAlert({
        show: true,
        status: 'info',
        message: 'Please fill in a question',
      });
      return;
    }

    const newQuestion = { id: uuidv4(), name: question, type };

    const newQuestions = [...questions, newQuestion];
    setQuestions(newQuestions);

    setQuestion('');
  };

  return (
    <div>
      <BackButton>&lArr; Back</BackButton>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-md my-5 h-80"
      >
        <InputText
          type="text"
          label="Quiz Title"
          name="title"
          placeholder="Input title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2"
        />
        <div className="space-y-2">
          <InputText
            type="text"
            label="Quiz Question"
            name="question"
            placeholder="Input question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="p-2 mr-2"
          />
          <InputSelect
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as Types)}
            className="mr-2"
            options={['Input', 'Boolean', 'Checkbox']}
          />
          <Button variant="primary" type="button" onClick={handleAddQuestion}>
            Add
          </Button>
        </div>
        <ul className="list-disc text-left">
          {questions.length !== 0 && 'Questions:'}
          {questions.map(({ id, name, type }) => (
            <li key={id} className="grid grid-cols-3 items-center gap-2 mb-2">
              <span className="max-w-30 overflow-hidden text-ellipsis">
                {name}
              </span>{' '}
              <span className="font-semibold">Type: {type}</span>
              <Button
                variant="secondary"
                onClick={() => handleDelete(id)}
                aria-label={`delete quiz list ${title}?`}
                className="w-auto justify-self-start"
              >
                <img src={Trash} alt="delete task" className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
        <Button
          type="submit"
          disabled={loading || !!error}
          className="self-center w-48 items-center mt-2"
        >
          Submit
        </Button>
      </form>
      {alert.show && (
        <Alert
          status={alert.status}
          message={alert.message}
          onClose={() => setAlert(ALERT_INITIAL)}
        />
      )}
    </div>
  );
}
