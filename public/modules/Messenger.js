import { formatDate, sounds } from "../scripts/utilities";

function Messenger() {
  const chatWindow = document.querySelector(".chat-window");
  const messagesContainer = document.querySelector(".messages-container");
  const btnSend = document.getElementById("btn-send");
  const emoticonToggle = document.getElementById("emoticon-toggle");
  const menuContainer = document.querySelector(".menu-container");

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
    const para = document.createElement("p");
    para.setAttribute("class", "message");
    para.textContent = (name || "Anon") + ": " + message;
    textDiv.appendChild(currentDate);
    textDiv.appendChild(para);
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
    menuContainer,
  };
}

export default Messenger();
