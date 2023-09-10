import { formatDate, sounds } from "../scripts/utilities";

function Messenger() {
  const chatWindow = document.querySelector(".chat-window");
  const messagesContainer = document.querySelector(".messages-container");
  const btnSend = document.getElementById("btn-send");
  const emoticonToggle = document.getElementById("emoticon-toggle");
  const lobbyContainer = document.querySelector(".lobby-container");

  const send = (userInput, userName) => {
    if (!userInput.value) return;

    sounds.message_sent.play();

    socket.emit("message", {
      name: userName,
      message: userInput.value,
      date: formatDate(new Date()),
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
    messagesContainer.appendChild(textDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  return {
    send,
    output,
    chatWindow,
    btnSend,
    emoticonToggle,
    messagesContainer,
    lobbyContainer,
  };
}

export default Messenger();
