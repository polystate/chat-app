import Messenger from "../modules/Messenger";
import User from "../modules/User";
import { emoticons } from "./utilities";

Messenger.btnSend.addEventListener("click", (e) => {
  e.preventDefault();
  Messenger.send(User.input, User.name);
});

User.input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    Messenger.send(User.input, User.name);
  }
});

User.enterName.addEventListener("input", (e) => {
  User.name = e.target.value;
  User.storeName(e.target.value);
});

Messenger.emoticonToggle.addEventListener("click", () => {
  if (!User.menuOpen) {
    Messenger.emoticonToggle.classList.add("active-star");
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
        User.input.value += emojiCopy.textContent;
      }
    });
    User.menuOpen = true;
  } else {
    Messenger.emoticonToggle.classList.remove("active-star");
    document.querySelector(".emoticon-menu").remove();
    User.menuOpen = false;
  }
});
