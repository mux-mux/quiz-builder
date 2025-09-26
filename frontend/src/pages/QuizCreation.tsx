import { useState, type FormEvent } from 'react';
import { useMutate } from '../hooks/useMutate';

type QuizProps = {
  title: string;
  questions: string[];
};

export function QuizCreation() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const { loading, error, mutate } = useMutate<QuizProps>(
    'http://localhost:3001/quizzes'
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const handleCreate = async () => await mutate('POST', { title, questions });
    handleCreate();

    setQuestions([]);
  };

  const handleAddQuestion = () => {
    const newQuestion = [...questions, question];
    setQuestions(newQuestion);

    setQuestion('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-md">
        <label htmlFor="title" className="block">
          Quiz Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Input title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border radius-md border-gray-200 px-2"
        />
        <label htmlFor="question" className="block">
          Quiz Question
        </label>
        <input
          type="text"
          id="question"
          name="question"
          placeholder="Input question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border rounded-md border-gray-200 px-2"
        />
        <button onClick={handleAddQuestion}>Add</button>
        <button type="submit" disabled={loading || !!error}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default QuizCreation;
