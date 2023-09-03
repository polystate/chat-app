import { generateAllSVGs, formatDate } from "./utilities";
import socket from "./socket";

const btnSend = document.getElementById("btn-send");
const enterUserName = document.querySelectorAll(".user-input")[0];
const emoticonToggle = document.getElementById("emoticon-toggle");
const chatWindow = document.querySelector(".chat-window");

let userName = "";
let menuOpen = false;
let userInput = document.querySelectorAll(".user-input")[1];
let emoticonIcons = ["smile", "map", "key", "chat"];

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

enterUserName.addEventListener("input", (e) => {
  userName = e.target.value;
});

emoticonToggle.addEventListener("click", () => {
  if (!menuOpen) {
    emoticonToggle.classList.add("active-star");
    const emoticonMenu = document.createElement("div");
    emoticonMenu.setAttribute("class", "emoticon-menu");
    generateAllSVGs(emoticonMenu, emoticonIcons);
    chatWindow.appendChild(emoticonMenu);
    emoticonMenu.addEventListener("click", (e) => {
      const clientClicked = e.target.getAttribute("class");
      if (clientClicked === "svg") {
        console.log(e.target);
      }
    });
    menuOpen = true;
  } else {
    emoticonToggle.classList.remove("active-star");
    document.querySelector(".emoticon-menu").remove();
    menuOpen = false;
  }
});

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