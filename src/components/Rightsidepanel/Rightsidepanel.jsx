// import "../../App.css";
import { useState } from "react";
function Rightsidepanel({
  userIndex,
  listofUsers,
  setIsStateUpdated,
  stage,
  count,
  botQuestion,
  addChatBotQuestion,
  findNextQuestionAndAsk,
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

  function startAdvisorChat() {
    if (listofUsers[userIndex].name === "New User") {
      addChatBotQuestion(botQuestion[0][0].question);
    } else {
      addChatBotQuestion(botQuestion[1][0].question);
    }
  }

  function output(input) {
    if (
      // Check if the index is still within the range of the botQuestion
      findQuestionIndex(stage, count) < [...botQuestion.flat(Infinity)].length
      // currentCount < Object.keys(botQuestion).length &&
      // count < Object.keys(userAnswer).length
    ) {
      if (stage === 0 && count === 0) {
        listofUsers[userIndex].setName(input);
      } else if (stage === 1 && count === 0) {
        listofUsers[userIndex].setSurveyResult(count, input);
        listofUsers[userIndex].setSurveyResultStatus(count, "answered");
      } else if (stage === 2 && count >= 0) {
        // Change from using useState to calling the method
        // directly from the list of object
        // console.log("stage: " + stage + ", count: " + count);
        // console.log("Start with: " + findQuestionIndex(stage, count));
        listofUsers[userIndex].setTaxpayerAnswer(count, parseInt(input));
        listofUsers[userIndex].setTaxpayerAnswerStatus(count, "answered");
      }
    }
    // Update the state of the listofUsers
    setIsStateUpdated(true);
    // Display the User's answer on the Chat
    addChatUserAnswer(input);

    // Go the findNextQuestionAndAsk() procedure
    findNextQuestionAndAsk(userIndex);
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
