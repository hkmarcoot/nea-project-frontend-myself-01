import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// const title = "React";
import Header from "./components/Header/Header";
import Leftsidepanel from "./components/Leftsidepanel/Leftsidepanel";
import Rightsidepanel from "./components/Rightsidepanel/Rightsidepanel";
import Reportsection from "./components/Reportsection/Reportsection";

function App() {
  // const [count, setCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState({
    0: { answer: 0 },
    1: { answer: 0 },
    2: { answer: 0 },
    3: { answer: 0 },
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* <div className="flex flex-row justify-center">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <Header />
      <div className="flex flex-row justify-center h-136">
        <Leftsidepanel userAnswer={userAnswer} />
        <Rightsidepanel setUserAnswer={setUserAnswer} userAnswer={userAnswer} />
      </div>
      <Reportsection />
      <h1 className="text-3xl text-amber-400 font-bold underline">
        Hello world!
      </h1>
      <h2>I am Marco</h2>
      <h1>Vite + React</h1>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  );
}

export default App;
