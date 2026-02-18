import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">My Tasks</h1>
        </div>
      </div>
      <h1 className="text-3xl font-bold  underline ">
        Hello world!
      </h1>
    </>
  )
}

export default App
