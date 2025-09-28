import { useState, type FormEvent } from 'react';
import { useMutate } from '../hooks/useMutate';
import { BackButton } from '../components/BackButton';
import Button from '../components/Button';
import { InputText } from '../components/InputText';

type QuizProps = {
  title: string;
  questions: string[];
};

type QuestionProps = {
  id: number;
  name: string;
  type: Types;
};

type Types = 'input' | 'boolean' | 'checkbox';

let id = 0;

export function QuizCreation() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
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
      alert(
        `New quizz with \n
        ${JSON.stringify({ title, questions }, null, 2)}
        \n has been succesfully created`
      );
      setTitle('');
      setQuestions([]);
      handleCreate();
      id = 0;
    } catch (error) {
      console.error('Task creation failed:', error);
    }
  };

  const handleAddQuestion = () => {
    if (question.length === 0) return alert('Please fill in a question');

    const newQuestion = { id: ++id, name: question, type };

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
          id="title"
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
            id="question"
            name="question"
            placeholder="Input question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="p-2 mr-2"
          />
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as Types)}
            className="mr-2"
          >
            <option value="input">Input</option>
            <option value="boolean">Boolean</option>
            <option value="checkbox">Checkbox</option>
          </select>
          <Button variant="primary" type="button" onClick={handleAddQuestion}>
            Add
          </Button>
        </div>
        {questions.length !== 0 && 'Questions:'}
        <ul className="list-disc text-left">
          {questions.map(({ id, name, type }) => (
            <li key={id}>
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
    </div>
  );
}
