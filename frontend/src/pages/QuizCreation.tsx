import { useState, type FormEvent } from 'react';
import { useMutate } from '../hooks/useMutate';
import { BackButton } from '../components/BackButton';
import Button from '../components/Button';
import { InputText } from '../components/InputText';
import Alert from '../components/Alert';
import { InputSelect } from '../components/InputSelect';

type QuizProps = {
  title: string;
  questions: string[];
};

type QuestionProps = {
  name: string;
  type: Types;
};

type Types = 'input' | 'boolean' | 'checkbox';

export function QuizCreation() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState<Types>('input');
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const { loading, error, mutate } = useMutate<QuizProps>(
    'http://localhost:3001/quizzes'
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length === 0) return alert('Please add a quiz title');
    if (questions.length === 0)
      return alert('Please add at leaset one question');

    try {
      const handleCreate = async () =>
        await mutate('POST', { title, questions });

      if (!loading && !error) setShowAlert(true);
      setTitle('');
      setQuestions([]);
      handleCreate();
    } catch (error) {
      console.error('Task creation failed:', error);
    }
  };

  const handleAddQuestion = () => {
    if (question.length === 0) return alert('Please fill in a question');

    const newQuestion = { name: question, type };

    const newQuestions = [...questions, newQuestion];
    setQuestions(newQuestions);

    setQuestion('');
  };

  return (
    <div>
      <BackButton>&lArr; Back</BackButton>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-md my-5"
      >
        <InputText
          type="text"
          label="Quiz Title"
          name="title"
          placeholder="Input title"
          required
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
        {questions.length !== 0 && 'Questions:'}
        <ul className="list-disc text-left">
          {questions.map(({ name, type }, index) => (
            <li key={index}>
              {name} <span className="font-semibold">Type: {type}</span>
            </li>
          ))}
        </ul>
        <Button
          type="submit"
          disabled={loading || !!error}
          className="self-center w-48 items-center"
        >
          Submit
        </Button>
      </form>
      {showAlert && (
        <Alert
          variant="success"
          message="New quizz has been succesfully created"
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
