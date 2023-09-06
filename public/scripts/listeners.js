import Messenger from "../modules/Messenger";
import User from "../modules/User";
import { emoticons } from "./utilities";

const btnSend = document.getElementById("btn-send");
const enterUserName = document.querySelectorAll(".user-input")[0];
const emoticonToggle = document.getElementById("emoticon-toggle");

let menuOpen = false;

btnSend.addEventListener("click", (e) => {
  e.preventDefault();
  Messenger.sendMessage(User.userInput, User.userName);
});

User.userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    Messenger.sendMessage(User.userInput, User.userName);
  }
});

enterUserName.addEventListener("input", (e) => {
  User.userName = e.target.value;
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

    Messenger.chatWindow.appendChild(emoticonMenu);
    emoticonMenu.addEventListener("click", (e) => {
      const clientClicked = e.target.getAttribute("class");
      if (clientClicked === "emoticon") {
        const emojiCopy = e.target.cloneNode(true);
        User.userInput.value += emojiCopy.textContent;
      }
    });
    menuOpen = true;
  } else {
    emoticonToggle.classList.remove("active-star");
    document.querySelector(".emoticon-menu").remove();
    menuOpen = false;
  }
});
