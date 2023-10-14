import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// const title = "React";
import Header from "./components/Header/Header";
import Leftsidepanel from "./components/Leftsidepanel/Leftsidepanel";
import Rightsidepanel from "./components/Rightsidepanel/Rightsidepanel";
import Reportsection from "./components/Reportsection/Reportsection";

function Taxpayer(newUser = {}) {
  const [name, setName] = useState(newUser.name);
  const [surveyResult, setSurveyResult] = useState([]);
  const [income, setIncome] = useState({});
  const [part1total, setPart1total] = useState(0);
  const [part2total, setPart2total] = useState(0);
  const [taxPaid, setTaxPaid] = useState(0);

  const setTaxpayerIncome = (answer) => {
    setIncome(answer);
  };

  const calculatePart1 = (income) => {
    return income;
  };
  const calculatePart2 = (income) => {};
  const calculateTaxPaid = () => {
    console.log("Income: " + income);
    setTaxPaid(Object.values(income).reduce((a, b) => a + b.answer, 0) + 1000);
  };

  return {
    name,
    setName,
    surveyResult,
    setSurveyResult,
    income,
    setIncome,
    part1total,
    setPart1total,
    part2total,
    setPart2total,
    taxPaid,
    setTaxPaid,
    setTaxpayerIncome,
    calculatePart1,
    calculatePart2,
    calculateTaxPaid,
  };
}

function App() {
  const user = new Taxpayer({ name: "Marco" });
  // const [count, setCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState({
    0: { answer: 0 },
    1: { answer: 0 },
    2: { answer: 0 },
    3: { answer: 0 },
  });
  useEffect(() => {
    user.setIncome(userAnswer);
  }, [userAnswer]);

  console.log(user.income);

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
        <Leftsidepanel
          userAnswer={userAnswer}
          taxPaid={user.taxPaid}
          calculateTaxPaid={user.calculateTaxPaid}
        />
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
