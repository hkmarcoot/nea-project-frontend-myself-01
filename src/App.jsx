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
      0: {
        status: "pending",
        answer: "",
        isValid: false,
        description: "Date of arrival",
      },
      1: {
        status: "pending",
        answer: "",
        description:
          "Question 1 for double check whether user is a UK resident",
      },
      2: {
        status: "pending",
        answer: "",
        description:
          "Question 2 for double check whether user is a UK resident",
      },
      3: {
        status: "pending",
        answer: "",
        description: "Result of the survey",
      },
    };
    this.taxpayerAnswer = newUser.taxpayerAnswer || {
      0: { status: "pending", answer: 0 },
      1: { status: "pending", answer: 0 },
      2: { status: "pending", answer: 0 },
      3: { status: "pending", answer: 0 },
    };
    this.numOfDaysFromArrival = newUser.numOfDaysFromArrival || 0;
    this.income = newUser.income || {};
    this.part1total = newUser.part1total || 0;
    this.part2total = newUser.part2total || 0;
    this.taxPaid = newUser.taxPaid || 0;
  }

  checkValidDateFormat(input) {
    if (!isNaN(Date.parse(input))) {
      this.surveyResult[0].isValid = true;
    } else {
      this.surveyResult[0].isValid = false;
    }
  }

  calculateNumOfDaysFromArrival(inputDate) {
    var arrivalDate = new Date(inputDate);
    var today = new Date();
    var timeDiff = today.getTime() - arrivalDate.getTime();
    // Use Math.ceil to get a whole number
    this.numOfDaysFromArrival = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  setSurveyResultBackToInitial(count) {
    this.surveyResult[count].status = "pending";
    this.surveyResult[count].answer = "";
  }

  setSurveyResultStatusToAllAnswered() {
    this.surveyResult[0].status = "answered";
    this.surveyResult[1].status = "answered";
    this.surveyResult[2].status = "answered";
    this.surveyResult[3].status = "answered";
    // for (var i = 0; i < Object.keys(this.surveyResult).length; i++) {
    //   this.surveyResult[i].status = "answered";
    // }
  }

  setTaxpayerAnswerStatusToAllSkipped() {
    for (var i = 0; i < Object.keys(this.taxpayerAnswer).length; i++) {
      this.taxpayerAnswer[i].status = "skipped";
    }
  }

  // setTaxpayerIncome(answer) {
  //   this.income = answer;
  // }

  // calculatePart1(income) {
  //   return income;
  // }

  // calculatePart2(income) {}

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
  const [isImport, setIsImport] = useState(false);

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
      {
        question:
          "Was your only home in the UK for 91 days or more in a row - and you visited or stayed in it for at least 30 days of the tax year?",
        answerType: "boolean",
      },
      {
        question:
          "Did you work full-time in the UK for any period of 365 days and at least one day of that period was in the tax year you’re checking?",
        answerType: "boolean",
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
    numOfDaysFromArrival,
    income,
    part1total,
    part2total,
    taxPaid
  ) {
    const newUser = new Taxpayer({
      name: newname,
      surveyResult: surveyResult,
      taxpayerAnswer: taxpayerAnswer,
      numOfDaysFromArrival,
      income: income,
      part1total: part1total,
      part2total: part2total,
      taxPaid: taxPaid,
    });
    setListofUsers((prevList) => [...prevList, newUser]);

    // If create new user is not from import
    // ask first question when the user is created
    if (!isImport) {
      // Note: The listofUsers is not updated immediately after the setListofUsers() call.
      // However, the index is listofUsers.length, i.e. first user is index 0.
      setUserIndex(listofUsers.length);
      // Set stage and count to be 1 and 0 respectively
      // so that the answer from user can be recorded
      setStage(1);
      setCount(0);
      // Ask the first question
      addChatBotQuestion("Hello " + newname + "!");
      addChatBotQuestion(botQuestion[1][0].question);
    } else {
      // If create new user is from import,
      // tell the user that the data is imported
      addChatBotQuestion("User data imported.");
    }
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

  // This subroutine is a procedure used by the Rightsidepanel and the UserCard in Header

  function findNextQuestionAndAsk(index) {
    // Apply the stage and count index numbering logic
    if (
      // Check if the user is new and the surveyResult is pending
      listofUsers[index].getSurveyResultStatus() === "pending"
    ) {
      // Set the stage and count to 1 and 0 respectively
      setStage(1);
      setCount(0);
      // We use currentStage and currentCount because
      // stage & count state are not updated yet
      // inside the function.
      var currentStage = 1;
      var currentCount = 0;
    } else if (listofUsers[index].surveyResult[0].isValid === false) {
      addChatBotQuestion(
        "Please enter the date in the form MM/DD/YYYY. For example, 11/30/2022."
      );
      // Clear the invalid date input
      listofUsers[index].setSurveyResultBackToInitial(0);
      // Set the stage and count to 1 and 0 respectively
      setStage(1);
      setCount(0);
      currentStage = 1;
      currentCount = 0;
    } else if (
      // Situation for number of days from arrival is negative
      listofUsers[index].numOfDaysFromArrival < 0
    ) {
      addChatBotQuestion("Please enter a date before today.");
      // Set the stage and count to 1 and 0 respectively
      setStage(1);
      setCount(0);
      currentStage = 1;
      currentCount = 0;

      // Reset question 1, 2, 3 and result in the surveyResult botQuestion
      listofUsers[index].setSurveyResultBackToInitial(0);
      listofUsers[index].setSurveyResultBackToInitial(1);
      listofUsers[index].setSurveyResultBackToInitial(2);
      listofUsers[index].setSurveyResultBackToInitial(3);
    } else if (
      // Situation for the number of days is 183 days or more
      listofUsers[index].numOfDaysFromArrival >= 183 &&
      listofUsers[index].surveyResult[1].status === "pending" &&
      listofUsers[index].surveyResult[2].status === "pending"
      // Comment out checking the result's status since it is 'answered'
      // when number of days is 183 days or more
      // listofUsers[index].surveyResult[3].status === "pending"
    ) {
      addChatBotQuestion(
        "Since you have been in UK for 183 days or more, you are a UK resident, and you need to pay UK tax on all your income, whether it’s from the UK or abroad."
      );
      addChatBotQuestion(
        "I have created a file for the tax year 2023/2024 for you. Now please enter your income for the tax year 2023/2024."
      );
      addChatBotQuestion(
        "We will start with calculating your non-saving income..."
      );
      addChatBotQuestion("First if");
      // Set all status in surveyResult to answered
      listofUsers[index].setSurveyResultStatusToAllAnswered();
      // Set the stage and count to 2 and 0 respectively
      setStage(2);
      setCount(0);
      currentStage = 2;
      currentCount = 0;
    } else if (
      // Situation for number of days from arrival is less than 183
      // and question 1 and 2 are pending
      // where the user haven't reached 1st question yet
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "pending" &&
      listofUsers[index].surveyResult[1].answer === "" &&
      listofUsers[index].surveyResult[2].status === "pending"
    ) {
      addChatBotQuestion(
        "Your number of days from arrival is less than 183 days, please answer the following question to check whether you are a UK resident."
      );
      // Set the stage and count to 1
      setStage(1);
      setCount(1);
      currentStage = 1;
      currentCount = 1;
      // addChatBotQuestion(
      //   "Survey Result: You are not a UK resident."
      // );
      // addChatBotQuestion(
      //   "You only have to pay tax on your UK income and do not have to pay tax on your forgein income. Income includes things like: pension, rental income, savings interest and wages"
      // );
    } else if (
      // Situation for the user does not input yes or no in 1st question
      // given that number of days from arrival is less than 183
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "pending" &&
      listofUsers[index].surveyResult[1].answer === "undefined" &&
      listofUsers[index].surveyResult[2].status === "pending"
    ) {
      addChatBotQuestion("Please answer yes or no to the question.");
      // Set the stage and count to 1
      setStage(1);
      setCount(1);
      currentStage = 1;
      currentCount = 1;
    } else if (
      // Situation for the user answers true in 1st question
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "answered" &&
      listofUsers[index].surveyResult[1].answer === true &&
      listofUsers[index].surveyResult[2].status === "pending"
    ) {
      addChatBotQuestion(
        "You are a UK resident, and you need to pay UK tax on all your income, whether it’s from the UK or abroad."
      );
      addChatBotQuestion(
        "I have created a file for the tax year 2023/2024 for you. Now please enter your income for the tax year 2023/2024."
      );
      addChatBotQuestion(
        "We will start with calculating your non-saving income..."
      );
      addChatBotQuestion("Second if");
      // Set all status in surveyResult to answered
      listofUsers[index].setSurveyResultStatusToAllAnswered();
      // Set the stage and count to 2 and 0 respectively
      setStage(2);
      setCount(0);
      currentStage = 2;
      currentCount = 0;
    } else if (
      // Situation for the user answers false in 1st question
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "answered" &&
      listofUsers[index].surveyResult[1].answer === false &&
      listofUsers[index].surveyResult[2].status === "pending"
    ) {
      // Set the stage and count to 1 and 2 respectively
      setStage(1);
      setCount(2);
      currentStage = 1;
      currentCount = 2;
      // addChatBotQuestion("Success");
    } else if (
      // Situation for the user does not input yes or no in 2nd question
      // given that number of days from arrival is less than 183
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "answered" &&
      listofUsers[index].surveyResult[2].status === "pending" &&
      listofUsers[index].surveyResult[2].answer === "undefined"
    ) {
      addChatBotQuestion("Please answer yes or no to the question.");
      // Set the stage and count to 1 and 2 respectively
      setStage(1);
      setCount(2);
      currentStage = 1;
      currentCount = 2;
    } else if (
      // Situation for the user answers true in 2st question
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "answered" &&
      listofUsers[index].surveyResult[2].status === "answered" &&
      listofUsers[index].surveyResult[2].answer === true &&
      listofUsers[index].surveyResult[3].status === "pending"
    ) {
      addChatBotQuestion(
        "You are a UK resident, and you need to pay UK tax on all your income, whether it’s from the UK or abroad."
      );
      addChatBotQuestion(
        "I have created a file for the tax year 2023/2024 for you. Now please enter your income for the tax year 2023/2024."
      );
      addChatBotQuestion(
        "We will start with calculating your non-saving income..."
      );
      addChatBotQuestion("Third if");
      // Set all status in surveyResult to answered
      listofUsers[index].setSurveyResultStatusToAllAnswered();
      // Set the stage and count to 2 and 0 respectively
      setStage(2);
      setCount(0);
      currentStage = 2;
      currentCount = 0;
    } else if (
      // Situation for the user answers false in 2st question
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "answered" &&
      listofUsers[index].surveyResult[2].status === "answered" &&
      listofUsers[index].surveyResult[2].answer === false
    ) {
      addChatBotQuestion("Survey Result: You are not a UK resident.");
      addChatBotQuestion(
        "You only have to pay tax on your UK income and do not have to pay tax on your forgein income. Income includes things like: pension, rental income, savings interest and wages"
      );
      // Set all status in surveyResult to answered
      listofUsers[index].setSurveyResultStatusToAllAnswered();
      // Set all status in taxpayerAnswer to skipped
      // so that all taxpayerAnswer is not marked as pending
      // hence passing the isAllTaxpayerAnswerStatusIsAnswered() check
      listofUsers[index].setTaxpayerAnswerStatusToAllSkipped();
    } else if (!listofUsers[index].isAllTaxpayerAnswerStatusIsAnswered()) {
      // Check which question is still pending in stage 2
      for (var i = 0; i < botQuestion[2].length; i++) {
        if (listofUsers[index].getTaxpayerAnswerStatus(i) === "pending") {
          setStage(2);
          setCount(i);
          currentStage = 2;
          currentCount = i;
          break;
        }
      }
    }

    if (
      // End the chat when the all question answered
      listofUsers[index].getSurveyResultStatus() === "answered" &&
      listofUsers[index].isAllTaxpayerAnswerStatusIsAnswered()
    ) {
      // console.log("End with: " + findQuestionIndex(stage, count));
      addChatBotQuestion("End of Question");
      // Stop user changing the last item in stage 2
      // by setting the stage to 3
      // where stage 3 do not exist
      setStage(3);
    } else {
      addChatBotQuestion(botQuestion[currentStage][currentCount].question);
    }
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
        userIndex={userIndex}
        setListofUsers={setListofUsers}
        findNextQuestionAndAsk={findNextQuestionAndAsk}
        setIsImport={setIsImport}
      />
      <div className="flex flex-row justify-center h-136">
        <Leftsidepanel
          userIndex={userIndex}
          userSurveyResult={listofUsers[userIndex].surveyResult}
          userAnswer={listofUsers[userIndex].taxpayerAnswer}
          taxPaid={listofUsers[userIndex].taxPaid}
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
          setIsStateUpdated={setIsStateUpdated}
          stage={stage}
          count={count}
          botQuestion={botQuestion}
          addChatBotQuestion={addChatBotQuestion}
          findNextQuestionAndAsk={findNextQuestionAndAsk}
        />
      </div>
      <Reportsection />
    </div>
  );
}

export default App;
