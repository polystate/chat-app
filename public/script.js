const socket = io();
const btnSend = document.getElementById("btn-send");
const enterUserName = document.querySelectorAll(".user-input")[0];

let userName = "";

socket.on("message", (name, message) => {
  outputMessage(name, message);
});

btnSend.addEventListener("click", (e) => {
  e.preventDefault();

  let userInput = document.querySelectorAll(".user-input")[1];
  if (!userInput.value) return;

  socket.emit("message", userName, userInput.value);

  userInput.value = "";
  userInput.focus();
});

enterUserName.addEventListener("input", (e) => {
  userName = e.target.value;
});

function outputMessage(name, message) {
  const chatWindow = document.querySelector(".chat-window");
  const textDiv = document.createElement("div");
  textDiv.setAttribute("class", "text-container");
  const para = document.createElement("p");
  para.setAttribute("class", "message");
  para.textContent = (name || "Anon") + ": " + message;
  textDiv.appendChild(para);
  chatWindow.appendChild(textDiv);
}
