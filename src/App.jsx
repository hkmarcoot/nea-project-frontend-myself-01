import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Leftsidepanel from "./components/Leftsidepanel/Leftsidepanel";
import Rightsidepanel from "./components/Rightsidepanel/Rightsidepanel";
import Reportsection from "./components/Reportsection/Reportsection";

class Taxpayer {
  constructor(newUser = {}) {
    this.name = newUser.name || "";
    this.surveyResult = [];
    this.taxpayerAnswer = {
      0: { answer: 0 },
      1: { answer: 0 },
      2: { answer: 0 },
      3: { answer: 0 },
    };
    this.income = {};
    this.part1total = 0;
    this.part2total = 0;
    this.taxPaid = 0;
  }

  setTaxpayerIncome(answer) {
    this.income = answer;
  }

  calculatePart1(income) {
    return income;
  }

  calculatePart2(income) {}

  calculateTaxPaid() {
    var sum =
      Object.values(this.taxpayerAnswer).reduce((a, b) => a + b.answer, 0) +
      1000;
    this.taxPaid = sum;
  }

  setTaxpayerAnswer(questionNumber, answer) {
    this.taxpayerAnswer[questionNumber].answer = answer;
  }
}

function App() {
  // Create the first user and add it to the list of users.
  const firstUser = new Taxpayer({ name: "New User" });

  const [listofUsers, setListofUsers] = useState([firstUser]);
  const [userIndex, setUserIndex] = useState(0);
  const [isStateUpdated, setIsStateUpdated] = useState(false);

  // This useEffect is to trigger re-renders when the listofUsers is updated.
  useEffect(() => {
    if (isStateUpdated) {
      setListofUsers(listofUsers);
      setIsStateUpdated(false);
    }
  }, [isStateUpdated]);

  function createNewUser(newname) {
    const newUser = new Taxpayer({ name: newname });
    setListofUsers((prevList) => [...prevList, newUser]);
    // Note: The listofUsers is not updated immediately after the setListofUsers() call.
    // However, the index is listofUsers.length, i.e. first user is index 0.
    setUserIndex(listofUsers.length);
  }

  // console.log("Specific user: " + JSON.stringify(listofUsers[userIndex]));
  console.log("list: " + JSON.stringify(listofUsers));
  // console.log("index: " + userIndex);
  // console.log("first user: " + JSON.stringify(firstUser));

  return (
    <div className="max-w-6xl mx-auto">
      <Header
        listofUsers={listofUsers}
        createNewUser={createNewUser}
        setUserIndex={setUserIndex}
      />
      <div className="flex flex-row justify-center h-136">
        <Leftsidepanel
          userIndex={userIndex}
          userAnswer={listofUsers[userIndex].taxpayerAnswer}
          taxPaid={listofUsers[userIndex].taxPaid}
          // calculateTaxPaid={listofUsers[userIndex].calculateTaxPaid}
          listofUsers={listofUsers}
          setIsStateUpdated={setIsStateUpdated}
        />
        <Rightsidepanel
          userIndex={userIndex}
          listofUsers={listofUsers}
          // setUserAnswer={listofUsers[0].setTaxpayerAnswer}
          userAnswer={listofUsers[userIndex].taxpayerAnswer}
          setIsStateUpdated={setIsStateUpdated}
        />
      </div>
      <Reportsection />
    </div>
  );
}

export default App;
