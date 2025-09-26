import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold">{`Hello world! ${count} times`}</h1>
      <button
        onClick={() => setCount(count + 1)}
        className="p-4 mt-8 border rounded"
      >
        Increase counts
      </button>
    </>
  );
}

export default App;
