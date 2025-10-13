import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center gap-8 p-6">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-24 transition-transform hover:scale-110" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-24 transition-transform hover:scale-110" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">Vite + React</h1>
      <div className="card text-center">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          count is {count}
        </button>
        <p>
          Edit <code className="bg-gray-100 px-1 py-0.5 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-center text-gray-500 mt-6">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
