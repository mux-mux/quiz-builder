import './App.css';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useFetch } from './hooks/useFetch';
import { ErrorPage } from './pages/ErrorPage';

type Quizes = {
  title: string;
  questionsCount: number;
};

function App() {
  const { data, error, loading } = useFetch<Quizes[]>(
    `http://localhost:3001/quizess`
  );

  if (error) {
    return <ErrorPage title="quizes" error={error} />;
  }

  return (
    <div className="flex flex-col space-y-4 mb-6">
      {loading ? (
        <LoadingSpinner />
      ) : (
        data &&
        data.map(({ title, questionsCount }, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2">{questionsCount}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
