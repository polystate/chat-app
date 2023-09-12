import Messenger from "../modules/Messenger";
import User from "../modules/User";
import Lobby from "../modules/Lobby";
import { emoticons } from "./utilities";

//Messenger Send

Messenger.btnSend.addEventListener("click", (e) => {
  e.preventDefault();
  Messenger.send(User.input, User.name);
  userLocEmoticon();
});

document.body.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    Messenger.send(User.input, User.name);
    userLocEmoticon();
  }
});

//Enter name input

User.enterName.addEventListener("input", (e) => {
  User.name = e.target.value;
  User.storeName(e.target.value);
  Lobby.aliasDisplay.textContent = e.target.value || "Anon";
});

//Toggle main menu

User.hamburger.addEventListener("click", () => {
  setTimeout(() => {
    if (User.isMenuDisplayed) {
      Messenger.messagesContainer.style.display = "none";
      Messenger.lobbyContainer.style.display = "flex";
    } else {
      Messenger.messagesContainer.style.display = "block";
      Messenger.lobbyContainer.style.display = "none";
      Messenger.chatWindow.scrollTop = Messenger.chatWindow.scrollHeight;
    }
    User.isMenuDisplayed = !User.isMenuDisplayed;
  }, 250);
});

//Toggle emoticon menu

Messenger.emoticonToggle.addEventListener("click", () => {
  if (!User.menuOpen) {
    Messenger.emoticonToggle.classList.add("active-star");
    const emoticonMenu = document.createElement("div");
    emoticonMenu.setAttribute("class", "emoticon-menu");
    const userPanel = document.querySelector(".user-panel");

    for (let i = 0; i < 5; i++) {
      const spanEmoji = document.createElement("span");
      spanEmoji.setAttribute("class", "emoticon");
      spanEmoji.textContent = emoticons[i];
      emoticonMenu.appendChild(spanEmoji);
    }

    //Append emoticonMenu to the DOM through userPanel

    userPanel.appendChild(emoticonMenu);

    emoticonMenu.style.marginBottom = `${userPanel.clientHeight}px`;

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

function userLocEmoticon() {
  if (User.getCurrentLoc() === "chat") {
    Messenger.emoticonToggle.classList.remove("active-star");
    const emoticonMenu = document.querySelector(".emoticon-menu");
    if (emoticonMenu) emoticonMenu.remove();
    User.menuOpen = false;
  }
}
