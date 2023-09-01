//Initialize socket.io
const socket = io();

//get variables of send button, enter user name, main emoticon for toggling emoticon menu, the chat window, and the message container
//append messageContainer to the chat window
const btnSend = document.getElementById("btn-send");
const enterUserName = document.querySelectorAll(".user-input")[0];
const emoticon = document.getElementById("emoticon");
const chatWindow = document.querySelector(".chat-window");
const messagesContainer = document.createElement("div");
let userInput = document.querySelectorAll(".user-input")[1];
messagesContainer.setAttribute("class", "messages-container");
chatWindow.appendChild(messagesContainer);

//initialize non constant variables userName and boolean switch menuOpen for emoticon menu
let userName = "";
let menuOpen = false;

//turn socket.on to listen for 'message' event emitted from server

socket.on("message", (data) => {
  const { name, message, date } = data;
  outputMessage(name, message, date);
});

//create event listener for the send button that makes it so socket.io emits the 'message' event and passes it to the server. this is stage 1 of socket.io ball. empty userInput value and focus() it.

btnSend.addEventListener("click", (e) => {
  e.preventDefault();
  sendMessage();
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
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

//transfer message between server/client

function sendMessage() {
  if (!userInput.value) return;

  socket.emit("message", {
    name: userName,
    message: userInput.value,
    date: formatDate(new Date()),
  });

  userInput.value = "";
  userInput.focus();
}

//dynamic output message function that creates html and sets up the structure

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
}

function formatDate(date) {
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "P.M." : "A.M.";
  const formattedHours = hours % 12 || 12;
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year} - ${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;
}
