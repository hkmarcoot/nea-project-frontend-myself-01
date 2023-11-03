import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Leftsidepanel from "./components/Leftsidepanel/Leftsidepanel";
import Rightsidepanel from "./components/Rightsidepanel/Rightsidepanel";
import Reportsection from "./components/Reportsection/Reportsection";
// import { list } from "postcss";

class Taxpayer {
  constructor(newUser = {}) {
    this.name = newUser.name || "";
    this.surveyResult = newUser.surveyResult || {
      0: { status: "pending", answer: "" },
    };
    this.taxpayerAnswer = newUser.taxpayerAnswer || {
      0: { status: "pending", answer: 0 },
      1: { status: "pending", answer: 0 },
      2: { status: "pending", answer: 0 },
      3: { status: "pending", answer: 0 },
    };
    this.income = newUser.income || {};
    this.part1total = newUser.part1total || 0;
    this.part2total = newUser.part2total || 0;
    this.taxPaid = newUser.taxPaid || 0;
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

  setName(answer) {
    this.name = answer;
  }

  setSurveyResult(questionNumber, answer) {
    this.surveyResult[questionNumber].answer = answer;
  }

  getSurveyResultStatus() {
    return this.surveyResult[0].status;
  }

  setSurveyResultStatus(questionNumber, status) {
    this.surveyResult[questionNumber].status = status;
  }

  setTaxpayerAnswer(questionNumber, answer) {
    this.taxpayerAnswer[questionNumber].answer = answer;
  }

  getTaxpayerAnswerStatus(questionNumber) {
    return this.taxpayerAnswer[questionNumber].status;
  }

  setTaxpayerAnswerStatus(questionNumber, status) {
    this.taxpayerAnswer[questionNumber].status = status;
  }

  isAllTaxpayerAnswerStatusIsAnswered() {
    var isAllAnswered = true;
    for (var i = 0; i < Object.keys(this.taxpayerAnswer).length; i++) {
      if (this.taxpayerAnswer[i].status === "pending") {
        isAllAnswered = false;
        break;
      }
    }
    return isAllAnswered;
  }
}

function App() {
  // Create the first user and add it to the list of users.
  const firstUser = new Taxpayer({ name: "New User" });

  const [listofUsers, setListofUsers] = useState([firstUser]);
  const [userIndex, setUserIndex] = useState(0);
  const [isStateUpdated, setIsStateUpdated] = useState(false);
  const [stage, setStage] = useState(0);
  const [count, setCount] = useState(0);

  const botQuestion = [
    [
      {
        question: "Welcome new user! Please enter your name: ",
        answerType: "string",
      },
    ],
    [
      {
        question:
          "Which day did you arrive UK? Please answer the question in the form MM/DD/YYYY.",
        answerType: "string",
      },
    ],
    [
      { question: "First question: what is 3 + 4 ?", type: 0 },
      { question: "Second question: what is 5 - 2 ?", type: 0 },
      { question: "What is 10 / 5 ?", type: 0 },
      { question: "Can you tell me what is 7 x 3 ?", type: 0 },
    ],
  ];

  // This useEffect is to trigger re-renders when the listofUsers is updated.
  useEffect(() => {
    if (isStateUpdated) {
      setListofUsers(listofUsers);
      setIsStateUpdated(false);
    }
  }, [isStateUpdated]);

  function createNewUser(
    newname,
    surveyResult,
    taxpayerAnswer,
    income,
    part1total,
    part2total,
    taxPaid
  ) {
    const newUser = new Taxpayer({
      name: newname,
      surveyResult: surveyResult,
      taxpayerAnswer: taxpayerAnswer,
      income: income,
      part1total: part1total,
      part2total: part2total,
      taxPaid: taxPaid,
    });
    setListofUsers((prevList) => [...prevList, newUser]);
    // Note: The listofUsers is not updated immediately after the setListofUsers() call.
    // However, the index is listofUsers.length, i.e. first user is index 0.
    setUserIndex(listofUsers.length);
  }

  function addChatBotQuestion(question) {
    const mainDiv = document.getElementById("dialogue-section");
    let chatbotDiv = document.createElement("div");
    chatbotDiv.id = "chatbot";
    chatbotDiv.classList.add("message");
    chatbotDiv.innerHTML = `<span id="chatbot-reply">${question}</span>`;
    mainDiv.appendChild(chatbotDiv);
    var scroll = document.getElementById("dialogue-section");
    scroll.scrollTop = scroll.scrollHeight;
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
        // setIsStateUpdated={setIsStateUpdated}
        userIndex={userIndex}
        setListofUsers={setListofUsers}
      />
      <div className="flex flex-row justify-center h-136">
        <Leftsidepanel
          userIndex={userIndex}
          userSurveyResult={listofUsers[userIndex].surveyResult}
          userAnswer={listofUsers[userIndex].taxpayerAnswer}
          taxPaid={listofUsers[userIndex].taxPaid}
          // calculateTaxPaid={listofUsers[userIndex].calculateTaxPaid}
          listofUsers={listofUsers}
          setIsStateUpdated={setIsStateUpdated}
          setStage={setStage}
          setCount={setCount}
          botQuestion={botQuestion}
          addChatBotQuestion={addChatBotQuestion}
        />
        <Rightsidepanel
          userIndex={userIndex}
          listofUsers={listofUsers}
          // setUserAnswer={listofUsers[0].setTaxpayerAnswer}
          userAnswer={listofUsers[userIndex].taxpayerAnswer}
          setIsStateUpdated={setIsStateUpdated}
          stage={stage}
          setStage={setStage}
          count={count}
          setCount={setCount}
          botQuestion={botQuestion}
          addChatBotQuestion={addChatBotQuestion}
        />
      </div>
      <Reportsection />
    </div>
  );
}

export default App;
