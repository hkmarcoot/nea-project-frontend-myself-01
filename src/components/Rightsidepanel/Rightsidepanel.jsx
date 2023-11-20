import { useState } from "react";
import { sentenceBank, botPreMadeReply } from "../PreMadeReply/PreMadeReply";
function Rightsidepanel({
  userIndex,
  listofUsers,
  setIsStateUpdated,
  stage,
  count,
  botQuestion,
  addChatBotQuestion,
  findNextQuestionAndAsk,
  isSurveyStart,
  setIsSurveyStart,
}) {
  const [newItem, setNewItem] = useState("");

  function sendMessage() {
    // const inputField = document.getElementById("input");
    // let input = inputField.value.trim();
    // input !== "" && output(input);
    newItem !== "" && output(newItem);
    // inputField.value = "";
    setNewItem("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      newItem !== "" && output(newItem);
      setNewItem("");
    }
  }

  // Find the question index as if the botQuestion is a flat array
  function findQuestionIndex(stage, count) {
    var result = 0;
    // Add the number of questions in the previous stage
    for (var i = 0; i < stage; i++) {
      // if (i === 0) {
      //   result += botQuestion[0].length;
      // } else if (i === 1) {
      //   result += botQuestion[1].length;
      // }
      result += botQuestion[i].length;
    }
    return result + count;
  }

  function isContainDollarSign(input) {
    return input.includes("$") || input.includes("£");
  }

  function removeDollarSign(input) {
    return input.replace("$", "").replace("£", "");
  }

  function startAdvisorChat() {
    setIsSurveyStart(true);
    if (
      listofUsers[userIndex].getSurveyResultDateStatus() === "answered" &&
      listofUsers[userIndex].isAllTaxpayerAnswerStatusAnswered()
    ) {
      // If the user have answered the survey,
      // tell them they have already completed the survey.
      addChatBotQuestion(
        "You have already answered the survey. Please press 'Calculate Tax' to calculate your tax."
      );
    } else if (listofUsers[userIndex].name === "New User") {
      addChatBotQuestion(botQuestion[0][0].question);
    } else {
      addChatBotQuestion(botQuestion[1][0].question);
    }
  }

  function findFromSentenceBank(sentenceBank, text, start, end) {
    // This is binary search in recursive method

    // Case that finish the searching and not found
    if (start > end) return "Not found from sentence bank";

    // Find the middle index
    var middleIndex = Math.floor((start + end) / 2);

    // Compare sentence at middle index with text
    if (sentenceBank[middleIndex] === text) return middleIndex;

    // If sentence at middle index is alphabetically greater than the text,
    // search in the upper half of middle index
    if (sentenceBank[middleIndex] > text) {
      return findFromSentenceBank(sentenceBank, text, start, middleIndex - 1);
    } else {
      // If sentence at middle index is alphabetically less than the text,
      // search in the lower half of middle index
      return findFromSentenceBank(sentenceBank, text, middleIndex + 1, end);
    }
  }

  function PreMadeChatbot(sentenceBank, text) {
    var result = findFromSentenceBank(
      sentenceBank,
      text,
      0,
      sentenceBank.length - 1
    );
    if (result === "Not found from sentence bank") {
      return addChatBotQuestion(
        "Question not found from Pre-made database. Please ask other question or switch to ChatGPT. To calculate tax, please press 'Start Advisor Chat' to begin the survey."
      );
    } else {
      return addChatBotQuestion(botPreMadeReply[result]);
    }
  }

  function output(input) {
    var booleanTrue = ["yes", "y", "true", "t"];
    var booleanFalse = ["no", "n", "false", "f"];
    if (
      // Check if the index is still within the range of the botQuestion
      findQuestionIndex(stage, count) < [...botQuestion.flat(Infinity)].length
      // currentCount < Object.keys(botQuestion).length &&
      // count < Object.keys(userAnswer).length
    ) {
      if (stage === 0 && count === 0 && isSurveyStart === false) {
        // Handle the situation user haven't press the 'Start Advisor Chat' button
        var inputToPreMadeChatbot = input.replace(/[_]/g, " ");
        inputToPreMadeChatbot = inputToPreMadeChatbot.replace(/[?]/g, "");
        inputToPreMadeChatbot = inputToPreMadeChatbot.toLowerCase();
        PreMadeChatbot(sentenceBank, inputToPreMadeChatbot);
        // Remove text in the chat box
        setNewItem("");
      } else if (stage === 0 && count === 0 && isSurveyStart === true) {
        listofUsers[userIndex].setName(input);
      } else if (stage === 1 && count === 0) {
        listofUsers[userIndex].setSurveyResult(count, input);
        listofUsers[userIndex].setSurveyResultStatus(count, "answered");
        listofUsers[userIndex].checkValidDateFormat(input);
        listofUsers[userIndex].calculateNumOfDaysFromArrival(input);
        // If the user have spent 183 or more days in the UK,
        // set the user's residency to be a UK resident
        if (listofUsers[userIndex].numOfDaysFromArrival >= 183) {
          listofUsers[userIndex].setSurveyResult(3, "User is a UK resident");
          listofUsers[userIndex].setSurveyResultStatus(3, "answered");
        }
        // Reset question 2 and 3 in the surveyResult botQuestion
        listofUsers[userIndex].setSurveyResultBackToInitial(1);
        listofUsers[userIndex].setSurveyResultBackToInitial(2);
      } else if ((stage === 1 && count === 1) || (stage === 1 && count === 2)) {
        if (booleanTrue.includes(input.toLowerCase())) {
          listofUsers[userIndex].setSurveyResult(count, true);
          listofUsers[userIndex].setSurveyResultStatus(count, "answered");
          listofUsers[userIndex].setSurveyResult(3, "User is a UK resident");
        } else if (booleanFalse.includes(input.toLowerCase())) {
          listofUsers[userIndex].setSurveyResult(count, false);
          listofUsers[userIndex].setSurveyResultStatus(count, "answered");
          if (stage === 1 && count === 2) {
            listofUsers[userIndex].setSurveyResult(
              3,
              "User is a non-resident in the UK"
            );
          }
        } else {
          // Set the answer to undefined if the user input is not yes or no
          // Keep the status as pending
          listofUsers[userIndex].setSurveyResult(count, "undefined");
        }
      } else if ((stage === 2 && count <= 3) || (stage === 2 && count >= 5)) {
        // Remove the dollar sign if the user input contains dollar sign
        if (isContainDollarSign(input)) {
          input = removeDollarSign(input);
        }
        // Remove the dot if the user input contains dot, just for checking
        // if the input contains only digits
        var withoutDot = input.replace(/[.]/g, "");
        // If the string contains only digits, convert it to a number
        if (/^\d+$/.test(withoutDot)) {
          input = parseFloat(input);
        }
        if (typeof input === "number") {
          // Save the user's answer if the input is a number
          listofUsers[userIndex].setTaxpayerAnswer(count, input);
          listofUsers[userIndex].setTaxpayerAnswerStatus(count, "answered");
          // It will ask user to input a number if the user input is not a number
          // This is programmed in findNextQuestionAndAsk()
        }
      } else if (stage === 2 && count === 4) {
        // Change from using useState to calling the method
        // directly from the list of object
        // console.log("stage: " + stage + ", count: " + count);
        // console.log("Start with: " + findQuestionIndex(stage, count));

        if (booleanTrue.includes(input.toLowerCase())) {
          listofUsers[userIndex].setTaxpayerAnswer(count, true);
          listofUsers[userIndex].setTaxpayerAnswerStatus(count, "answered");
          // Reset the status of the next 5 questions to be pending
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 1, "pending");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 2, "pending");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 3, "pending");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 4, "pending");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 5, "pending");
        } else if (booleanFalse.includes(input.toLowerCase())) {
          listofUsers[userIndex].setTaxpayerAnswer(count, false);
          listofUsers[userIndex].setTaxpayerAnswerStatus(count, "answered");
          // Set the status of the next 5 questions to be skipped
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 1, "skipped");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 2, "skipped");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 3, "skipped");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 4, "skipped");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 5, "skipped");
          // Reset the values to be 0 if the user answer 'No'
          listofUsers[userIndex].setTaxpayerAnswer(count + 1, 0);
          listofUsers[userIndex].setTaxpayerAnswer(count + 2, 0);
          listofUsers[userIndex].setTaxpayerAnswer(count + 3, 0);
          listofUsers[userIndex].setTaxpayerAnswer(count + 4, 0);
          listofUsers[userIndex].setTaxpayerAnswer(count + 5, 0);
        } else {
          // Set the answer to undefined if the user input is not yes or no
          // Keep the status as pending
          listofUsers[userIndex].setTaxpayerAnswer(count, "undefined");
        }
      }
    }
    // Update the state of the listofUsers
    setIsStateUpdated(true);
    // Display the User's answer on the Chat
    addChatUserAnswer(input);

    // Go the findNextQuestionAndAsk() procedure
    findNextQuestionAndAsk(userIndex, input);
  }

  function addChatUserAnswer(answer) {
    const mainDiv = document.getElementById("dialogue-section");
    let appUserDiv = document.createElement("div");
    appUserDiv.id = "appuser";
    appUserDiv.classList.add("message");
    appUserDiv.innerHTML = `<span id="appuser-response">${answer}</span>`;
    mainDiv.appendChild(appUserDiv);
    var scroll = document.getElementById("dialogue-section"); // It scroll down the chat automatically.
    scroll.scrollTop = scroll.scrollHeight;
  }

  function switchToChatGPT() {}

  return (
    <div className="w-1/2 bg-light-blue border-2">
      <div className="py-4">
        <button
          className="mx-6 md:w-36 lg:w-48"
          onClick={() => startAdvisorChat()}
        >
          Start Advisor Chat
        </button>
        <button className="mx-6 md:w-32 lg:w-48" onClick={switchToChatGPT}>
          Switch to ChatGPT
        </button>
      </div>
      <div
        id="dialogue-section"
        className="h-64  md:h-96 lg:h-104 text-left px-2 overflow-y-auto"
      >
        <div id="chatbot" className="message">
          <span id="chatbot-reply">
            Please Press 'Start Advisor Chat' button to begin
          </span>
        </div>
      </div>
      <div id="input-section">
        <input
          className="w-3/5 min-w-[200px] h-10 border-2"
          id="input"
          type="text"
          placeholder=" Start Conversation ..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send" onClick={() => sendMessage()}>
          <div className="circle">Send</div>
        </button>
      </div>
    </div>
  );
}

export default Rightsidepanel;
