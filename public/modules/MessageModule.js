function MessageModule() {
  const chatWindow = document.querySelector(".chat-window");
  const messagesContainer = document.querySelector(".messages-container");

  const outputMessage = (name, message, date) => {
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

  return { outputMessage, chatWindow };
}

export default MessageModule();
