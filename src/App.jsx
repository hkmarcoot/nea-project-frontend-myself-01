import { useEffect, useState } from "react";
import "./App.css";
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
  const [userAnswer, setUserAnswer] = useState({
    0: { answer: 0 },
    1: { answer: 0 },
    2: { answer: 0 },
    3: { answer: 0 },
  });
  const [listofUsers, setListofUsers] = useState([]);
  const [isUserListInit, setIsUserListInit] = useState(false);

  useEffect(() => {
    if (!isUserListInit) {
      setListofUsers([user]);
      // listofUsers.push(user);
      setIsUserListInit(true);
    }
  }, [isUserListInit]);

  useEffect(() => {
    user.setIncome(userAnswer);
  }, [userAnswer]);

  console.log(user.income);
  console.log("list: " + JSON.stringify(listofUsers));

  return (
    <div className="max-w-6xl mx-auto">
      <Header listofUsers={listofUsers} />
      <div className="flex flex-row justify-center h-136">
        <Leftsidepanel
          userAnswer={userAnswer}
          taxPaid={user.taxPaid}
          calculateTaxPaid={user.calculateTaxPaid}
        />
        <Rightsidepanel setUserAnswer={setUserAnswer} userAnswer={userAnswer} />
      </div>
      <Reportsection />
    </div>
  );
}

export default App;
