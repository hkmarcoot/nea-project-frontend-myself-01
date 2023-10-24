import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Leftsidepanel from "./components/Leftsidepanel/Leftsidepanel";
import Rightsidepanel from "./components/Rightsidepanel/Rightsidepanel";
import Reportsection from "./components/Reportsection/Reportsection";

function Taxpayer(newUser = {}) {
  const [name, setName] = useState(newUser.name);
  const [surveyResult, setSurveyResult] = useState([]);
  const [taxpayerAnswer, setTaxpayerAnswer] = useState({
    0: { answer: 0 },
    1: { answer: 0 },
    2: { answer: 0 },
    3: { answer: 0 },
  });
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
    console.log("Hello this is " + name);
    // console.log("Income hi: " + JSON.stringify(income));
    setTaxPaid(Object.values(income).reduce((a, b) => a + b.answer, 0) + 1000);
  };

  return {
    name,
    setName,
    surveyResult,
    setSurveyResult,
    taxpayerAnswer,
    setTaxpayerAnswer,
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
  // Create the first user and add it to the list of users.
  const firstUser = new Taxpayer({ name: "New User" });
  // const newUser = new Taxpayer({ name: "Boom" });
  // const [userAnswer, setUserAnswer] = useState({
  //   0: { answer: 0 },
  //   1: { answer: 0 },
  //   2: { answer: 0 },
  //   3: { answer: 0 },
  // });
  // Start with the first user called "New User"
  const [listofUsers, setListofUsers] = useState([firstUser]);
  const [userIndex, setUserIndex] = useState(0);
  // const [isUserListInit, setIsUserListInit] = useState(false);

  // useEffect(() => {
  //   if (!isUserListInit) {
  //     setListofUsers([user]);
  //     // listofUsers.push(user);
  //     setIsUserListInit(true);
  //   }
  // }, [isUserListInit]);

  // useEffect(() => {
  //   user.setIncome(userAnswer);
  // }, [userAnswer]);

  // console.log(newUser.income);
  // console.log("list: " + JSON.stringify(listofUsers));
  console.log("Specific user: " + JSON.stringify(listofUsers[userIndex]));

  function createNewUser(newname) {
    // Create new Taxpayer object cannot be inside createNewUser function
    // newUser.name = newname;
    // newUser.setName(newname);
    const newUser = new Taxpayer({ name: newname });
    setListofUsers((prevList) => [...prevList, newUser]);

    // Note: The listofUsers is not updated immediately after the setListofUsers() call.
    // However, the index is listofUsers.length, i.e. first user is index 0.
    setUserIndex(listofUsers.length);
  }

  console.log("list: " + JSON.stringify(listofUsers));
  console.log("index: " + userIndex);

  return (
    <div className="max-w-6xl mx-auto">
      <Header
        listofUsers={listofUsers}
        createNewUser={createNewUser}
        // Taxpayer={Taxpayer}
        // setListofUsers={setListofUsers}
        setUserIndex={setUserIndex}
      />
      <div className="flex flex-row justify-center h-136">
        <Leftsidepanel
          userIndex={userIndex}
          userAnswer={listofUsers[0].taxpayerAnswer}
          taxPaid={listofUsers[0].taxPaid}
          calculateTaxPaid={listofUsers[userIndex].calculateTaxPaid}
        />
        <Rightsidepanel
          setUserAnswer={listofUsers[0].setTaxpayerAnswer}
          userAnswer={listofUsers[0].taxpayerAnswer}
        />
      </div>
      <Reportsection />
    </div>
  );
}

export default App;
