// import "../../App.css";
import { useState } from "react";
function Rightsidepanel() {
  const [newItem, setNewItem] = useState("");
  const [count, setCount] = useState(1);

  const botQuestion = {
    0: { question: "This is the first question, what is 3 + 4 ?", type: 0 },
    1: { question: "Second question: what is 5 - 2 ?", type: 0 },
    2: { question: "What is 10 / 5 ?", type: 0 },
    3: { question: "Can you tell me what is 7 x 3 ?", type: 0 },
  };

  var userAnswerInit = {
    0: { answer: 0 },
    1: { answer: 0 },
    2: { answer: 0 },
    3: { answer: 0 },
  };

  const [userAnswer, setUserAnswer] = useState(userAnswerInit);
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
    userAnswer[count].answer = parseInt(input);
    // console.log(userAnswer);

    addChatUserAnswer(input);
    setCount((count) => count + 1);

    /* ********* Adding User Answer *********** */
    var sum = 0;
    // for (property in userAnswer) {
    //   sum += userAnswer[property].answer;
    // }
    /* *** or *** */
    sum = Object.values(userAnswer).reduce((a, b) => a + b.answer, 0);
    /* ********** */

    /* ********* Adding Ends ****************** */

    if (
      count < Object.keys(botQuestion).length &&
      count < Object.keys(userAnswer).length
    ) {
      addChatBotQuestion(botQuestion[count].question + "Total: " + sum);
    } else {
      addChatBotQuestion("Total: " + sum);
    }
  }

  function addChatBotQuestion(question) {
    const mainDiv = document.getElementById("dialogue-section"); //Added
    let botDiv = document.createElement("div");
    botDiv.id = "chatbot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="chatbot-reply">${question}</span>`;
    mainDiv.appendChild(botDiv);
    var scroll = document.getElementById("dialogue-section");
    scroll.scrollTop = scroll.scrollHeight;
    voiceControl(question);
  }

  function addChatUserAnswer(answer) {
    const mainDiv = document.getElementById("dialogue-section");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${answer}</span>`;
    mainDiv.appendChild(userDiv);
    var scroll = document.getElementById("dialogue-section"); //Added. It scroll down the chat automatically.
    scroll.scrollTop = scroll.scrollHeight; //Added
  }

  function switchToChatGPT() {}

  return (
    // <header className="mr-5 w-full h-1/3 bg-light-blue border-2 lg:h-screen lg:w-2/5"></header>
    <div className="w-1/2 bg-light-blue border-2">
      <div>
        <button className="mx-6" onClick={() => startAdvisorChat()}>
          Start Advisor Chat
        </button>
        <button className="mx-6" onClick={switchToChatGPT}>
          Switch to ChatGPT
        </button>
      </div>
      <div
        id="dialogue-section"
        className="h-96 text-left px-2 overflow-y-auto"
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
          id="input"
          type="text"
          placeholder="Type a message"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
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
