import { formatDate, sounds } from "../scripts/utilities";

function Messenger() {
  const DOM = {
    //chat window
    chatWindow: document.querySelector(".chat-window"),
    messagesContainer: document.querySelector(".messages-container"),
    //user panel
    btnSend: document.getElementById("btn-send"),
    emoticonToggle: document.getElementById("emoticon-toggle"),
    userPanel: document.querySelector(".user-panel"),
    //chat header
    countContainer: document.querySelector(".count-container"),
    countDisplay: document.createElement("p"),
  };

  const send = (userInput, userName) => {
    if (!userInput.value) return;

    sounds.message_sent.play();

    socket.emit("message", {
      name: userName,
      message: userInput.value,
      date: formatDate(new Date()),
      id: socket.id,
    });

    userInput.value = "";
    userInput.focus();
  };

  const output = (name, message, date) => {
    const textDiv = document.createElement("div");
    textDiv.setAttribute("class", "text-container");
    const currentDate = document.createElement("p");
    currentDate.setAttribute("class", "current-date");
    currentDate.textContent = date;
    const messageContent = document.createElement("p");
    messageContent.setAttribute("class", "message");
    messageContent.textContent = (name || "Anon") + ": " + message;
    textDiv.appendChild(currentDate);
    textDiv.appendChild(messageContent);
    DOM.messagesContainer.appendChild(textDiv);
    DOM.chatWindow.scrollTop = DOM.chatWindow.scrollHeight;
  };

  return {
    send,
    output,
    DOM,
  };
}

export default Messenger();
