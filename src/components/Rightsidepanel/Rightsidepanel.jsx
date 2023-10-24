// import "../../App.css";
import { useState } from "react";
function Rightsidepanel({
  userIndex,
  listofUsers,
  userAnswer,
  setIsStateUpdated,
}) {
  const [newItem, setNewItem] = useState("");
  const [count, setCount] = useState(0);

  const botQuestion = {
    0: { question: "This is the first question, what is 3 + 4 ?", type: 0 },
    1: { question: "Second question: what is 5 - 2 ?", type: 0 },
    2: { question: "What is 10 / 5 ?", type: 0 },
    3: { question: "Can you tell me what is 7 x 3 ?", type: 0 },
  };

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

  // document.addEventListener("DOMContentLoaded", () => {
  //   const inputField = document.getElementById("input");
  //   inputField.addEventListener("keydown", function (e) {
  //     if (e.code === "Enter") {
  //       let input = inputField.value.trim();
  //       input !== "" && output(input);
  //       inputField.value = "";
  //     }
  //   });
  // });

  function startAdvisorChat() {
    addChatBotQuestion(botQuestion[0].question);
  }

  function output(input) {
    if (
      count < Object.keys(botQuestion).length &&
      count < Object.keys(userAnswer).length
    ) {
      // Change from using useState to calling the method
      // directly from the list of object
      listofUsers[userIndex].setTaxpayerAnswer(count, parseInt(input));
      setIsStateUpdated(true);
    }

    addChatUserAnswer(input);
    setCount((count) => count + 1);

    // We use currentCount because count is not updated yet
    var currentCount = count + 1;

    if (
      currentCount < Object.keys(botQuestion).length &&
      currentCount < Object.keys(userAnswer).length
    ) {
      addChatBotQuestion(botQuestion[currentCount].question);
    } else {
      addChatBotQuestion("End of Question");
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
