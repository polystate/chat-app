import Messenger from "../modules/Messenger";
import User from "../modules/User";
import Lobby from "../modules/Lobby";
import { emoticons, handleSendMessage } from "./utilities";

//Body Listener

document.body.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSendMessage(e);
  }
});

//Messenger Send

Messenger.btnSend.addEventListener("click", handleSendMessage);

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
      Lobby.lobbyContainer.style.display = "flex";
    } else {
      Messenger.messagesContainer.style.display = "block";
      Lobby.lobbyContainer.style.display = "none";
      Messenger.chatWindow.scrollTop = Messenger.chatWindow.scrollHeight;
    }
    User.isMenuDisplayed = !User.isMenuDisplayed;
  }, 250);
});

//Toggle emoticon menu

Messenger.emoticonToggle.addEventListener("click", () => {
  if (!User.emoticonMenuOpen) {
    Messenger.emoticonToggle.classList.add("active-star");
    const emoticonMenu = document.createElement("div");
    emoticonMenu.setAttribute("class", "emoticon-menu");

    for (let i = 0; i < 5; i++) {
      const spanEmoji = document.createElement("span");
      spanEmoji.setAttribute("class", "emoticon");
      spanEmoji.textContent = emoticons[i];
      emoticonMenu.appendChild(spanEmoji);
    }

    //Append emoticonMenu to the DOM through userPanel

    Messenger.userPanel.appendChild(emoticonMenu);

    emoticonMenu.style.marginBottom = `${Messenger.userPanel.clientHeight}px`;

    emoticonMenu.addEventListener("click", (e) => {
      const clientClicked = e.target.getAttribute("class");
      if (clientClicked === "emoticon") {
        const emojiCopy = e.target.cloneNode(true);
        User.input.value += emojiCopy.textContent;
      }
    });
    User.emoticonMenuOpen = true;
  } else {
    Messenger.emoticonToggle.classList.remove("active-star");
    document.querySelector(".emoticon-menu").remove();
    User.emoticonMenuOpen = false;
  }
});
