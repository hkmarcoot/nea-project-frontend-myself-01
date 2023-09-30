// import "../../App.css";
import { useState } from "react";
function Rightsidepanel({ setUserAnswer, userAnswer }) {
  const [newItem, setNewItem] = useState("");
  const [count, setCount] = useState(0);

  const botQuestion = {
    0: { question: "This is the first question, what is 3 + 4 ?", type: 0 },
    1: { question: "Second question: what is 5 - 2 ?", type: 0 },
    2: { question: "What is 10 / 5 ?", type: 0 },
    3: { question: "Can you tell me what is 7 x 3 ?", type: 0 },
  };

  // var userAnswerInit = {
  //   0: { answer: 0 },
  //   1: { answer: 0 },
  //   2: { answer: 0 },
  //   3: { answer: 0 },
  // };

  // const [userAnswer, setUserAnswer] = useState(userAnswerInit);
  // var k = 0;

  const synth = window.speechSynthesis;

  function voiceControl(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-aus";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);
  }

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
      // Should be using useState here
      // userAnswer[count].answer = parseInt(input);
      // useState version
      setUserAnswer((userAnswer) => ({
        ...userAnswer,
        [count]: { answer: parseInt(input) },
      }));
    }
    // console.log(userAnswer);

    addChatUserAnswer(input);
    setCount((count) => count + 1);

    /* ********* Adding User Answer *********** */
    // var sum = 0;
    // for (property in userAnswer) {
    //   sum += userAnswer[property].answer;
    // }
    /* *** or *** */
    // sum = Object.values(userAnswer).reduce((a, b) => a + b.answer, 0);
    /* ********** */

    /* ********* Adding Ends ****************** */

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
    const mainDiv = document.getElementById("dialogue-section"); //Added
    let chatbotDiv = document.createElement("div");
    chatbotDiv.id = "chatbot";
    chatbotDiv.classList.add("message");
    chatbotDiv.innerHTML = `<span id="chatbot-reply">${question}</span>`;
    mainDiv.appendChild(chatbotDiv);
    var scroll = document.getElementById("dialogue-section");
    scroll.scrollTop = scroll.scrollHeight;
    voiceControl(question);
  }

  function addChatUserAnswer(answer) {
    const mainDiv = document.getElementById("dialogue-section");
    let appUserDiv = document.createElement("div");
    appUserDiv.id = "appuser";
    appUserDiv.classList.add("message");
    appUserDiv.innerHTML = `<span id="appuser-response">${answer}</span>`;
    mainDiv.appendChild(appUserDiv);
    var scroll = document.getElementById("dialogue-section"); //Added. It scroll down the chat automatically.
    scroll.scrollTop = scroll.scrollHeight; //Added
  }

  function switchToChatGPT() {}

  return (
    // <header className="mr-5 w-full h-1/3 bg-light-blue border-2 lg:h-screen lg:w-2/5"></header>
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
        <div
          id="chatbot"
          // className="message relative bottom-0 min-h-[50px] border-solid border-2 border-button-blue rounded-tr-lg rounded-bl-lg rounded-br-lg p-2 my-2"
          className="message"
        >
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
          // autocomplete="off"
          // autofocus="autofocus"
        />
        <button className="send" onClick={() => sendMessage()}>
          <div className="circle">
            {/* <i class="zmdi zmdi-mail-send"></i> */}
            Send
          </div>
        </button>
      </div>
    </div>
  );
}

export default Rightsidepanel;
