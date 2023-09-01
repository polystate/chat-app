//Initialize socket.io
const socket = io();

//get variables of send button, enter user name, main emoticon for toggling emoticon menu, the chat window, and the message container
//append messageContainer to the chat window
const btnSend = document.getElementById("btn-send");
const enterUserName = document.querySelectorAll(".user-input")[0];
const emoticon = document.getElementById("emoticon");
const chatWindow = document.querySelector(".chat-window");
const messagesContainer = document.createElement("div");
messagesContainer.setAttribute("class", "messages-container");
chatWindow.appendChild(messagesContainer);

//initialize non constant variables userName and boolean switch menuOpen for emoticon menu
let userName = "";
let menuOpen = false;

//turn socket.on to listen for 'message' event emitted from server

socket.on("message", (data) => {
  const { name, message } = data;
  outputMessage(name, message);
});

//create event listener for the send button that makes it so socket.io emits the 'message' event and passes it to the server. this is stage 1 of socket.io ball. empty userInput value and focus() it.

btnSend.addEventListener("click", (e) => {
  e.preventDefault();

  let userInput = document.querySelectorAll(".user-input")[1];
  if (!userInput.value) return;

  socket.emit("message", { name: userName, message: userInput.value });

  userInput.value = "";
  userInput.focus();
});

//create an event listener for when you type into the enter user name input and it reacts immediately with input even handler. current name updates the global userName variable

enterUserName.addEventListener("input", (e) => {
  userName = e.target.value;
});

//create an event listener for emoticon to trigger emoticon menu, toggle menuOpen boolean

emoticon.addEventListener("click", () => {
  if (!menuOpen) {
    const emoticonMenu = document.createElement("div");
    emoticonMenu.setAttribute("class", "emoticon-menu");
    chatWindow.appendChild(emoticonMenu);
    menuOpen = true;
  } else {
    document.querySelector(".emoticon-menu").remove();
    menuOpen = false;
  }
});

//dynamic output message function that creates html and sets up the structure

export default function outputMessage(name, message) {
  messagesContainer.setAttribute("class", "message-container");
  const textDiv = document.createElement("div");
  textDiv.setAttribute("class", "text-container");
  const para = document.createElement("p");
  para.setAttribute("class", "message");
  para.textContent = (name || "Anon") + ": " + message;
  textDiv.appendChild(para);
  messagesContainer.appendChild(textDiv);
}
