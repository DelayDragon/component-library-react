
import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          测试
        </a>
        <a href="https://react.dev" target="_blank">
          sss
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Vite + React</h2>
      <h3>Vite + React</h3>
      <h4>Vite + React</h4>
      <h5>Vite + React</h5>
      <h6>Vite + React</h6>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
