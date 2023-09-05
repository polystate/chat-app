import MessageModule from "../modules/MessageModule";
import { formatDate, emoticons, sounds } from "./utilities";

const btnSend = document.getElementById("btn-send");
const enterUserName = document.querySelectorAll(".user-input")[0];
const emoticonToggle = document.getElementById("emoticon-toggle");
let userInput = document.querySelectorAll(".user-input")[1];

let userName = "";
let menuOpen = false;

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

    for (let i = 0; i < 5; i++) {
      const spanEmoji = document.createElement("span");
      spanEmoji.setAttribute("class", "emoticon");
      spanEmoji.textContent = emoticons[i];
      emoticonMenu.appendChild(spanEmoji);
    }

    MessageModule.chatWindow.appendChild(emoticonMenu);
    emoticonMenu.addEventListener("click", (e) => {
      const clientClicked = e.target.getAttribute("class");
      if (clientClicked === "emoticon") {
        const emojiCopy = e.target.cloneNode(true);
        userInput.value += emojiCopy.textContent;
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

  sounds.message_sent.play();

  socket.emit("message", {
    name: userName,
    message: userInput.value,
    date: formatDate(new Date()),
  });

  userInput.value = "";
  userInput.focus();
}
