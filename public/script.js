import { sounds } from "./scripts/utilities.js";

const chatWindow = document.querySelector(".chat-window");
const messagesContainer = document.createElement("div");
const countContainer = document.querySelector(".count-container");
const countDisplay = document.createElement("p");

messagesContainer.setAttribute("class", "messages-container");
chatWindow.appendChild(messagesContainer);

socket.on("userJoined", () => {
  sounds.user_enter.play();
});

socket.on("message", (data) => {
  const { name, message, date } = data;
  outputMessage(name, message, date);
});

socket.on("userCount", (userCount) => {
  countDisplay.textContent = `${userCount} ${
    userCount > 1 ? "users" : "user"
  } active`;
  countDisplay.setAttribute("class", "user-input");
  countDisplay.setAttribute("id", "count-text");
  countContainer.appendChild(countDisplay);
});

function outputMessage(name, message, date) {
  messagesContainer.setAttribute("class", "message-container");
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
}
