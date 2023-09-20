import Messenger from "../modules/Messenger";
import User from "../modules/User";
import Lobby from "../modules/Lobby";
import { emoticons, handleSendMessage, optionsToggle } from "./utilities";

window.onload = function () {
  console.log("All resources have finished loading.");
  const countText = document.getElementById("count-text");
  if (!countText) {
    console.log("Error with countText");
    location.reload();
  }
};

//Body Listener
document.addEventListener("DOMContentLoaded", () => {
  const currentName = document.getElementById("current-name");

  socket.on("userJoined", (data) => {
    if (!data) return;
    data.forEach((user) => {
      if (socket.id === user.id) {
        currentName.placeholder = `Name: ${user.name}`;
      }
    });
  });
});

document.body.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSendMessage(e);
  }
});

//Messenger Send

Messenger.DOM.btnSend.addEventListener("click", handleSendMessage);

//Enter name input

User.DOM.enterName.addEventListener("input", (e) => {
  User.DOM.name = e.target.value;
  User.storeName(e.target.value);
  Lobby.DOM.aliasDisplay.textContent = e.target.value || "Anon";
  console.log(Lobby.saveChanges);
});

//Toggle main menu

User.DOM.hamburger.addEventListener("click", () => {
  setTimeout(() => {
    if (User.DOM.isMenuDisplayed) {
      /*Navigated to Chat*/
      document.getElementById("enter-name").style.display = "block";
      document.getElementById("current-name").style.display = "none";
      Messenger.DOM.messagesContainer.style.display = "none";
      Lobby.DOM.lobbyContainer.style.display = "flex";
      Messenger.DOM.chatWindow.scrollTop = 0;
    } else {
      /*Navigated to Lobby*/
      const currentName = document.getElementById("current-name");
      document.getElementById("enter-name").style.display = "none";
      currentName.style.display = "block";
      Messenger.DOM.messagesContainer.style.display = "block";
      Lobby.DOM.lobbyContainer.style.display = "none";
      Messenger.DOM.chatWindow.scrollTop =
        Messenger.DOM.chatWindow.scrollHeight;
    }
    User.DOM.isMenuDisplayed = !User.DOM.isMenuDisplayed;
  }, 250);
});

//Toggle emoticon menu

Messenger.DOM.emoticonToggle.addEventListener("click", () => {
  if (!User.DOM.emoticonMenuOpen) {
    Messenger.DOM.emoticonToggle.classList.add("active-star");
    const emoticonMenu = document.createElement("div");
    emoticonMenu.setAttribute("class", "emoticon-menu");

    for (let i = 0; i < 5; i++) {
      const spanEmoji = document.createElement("span");
      spanEmoji.setAttribute("class", "emoticon");
      spanEmoji.textContent = emoticons[i];
      emoticonMenu.appendChild(spanEmoji);
    }

    //Append emoticonMenu to the DOM through userPanel

    Messenger.DOM.userPanel.appendChild(emoticonMenu);

    emoticonMenu.style.marginBottom = `${Messenger.DOM.userPanel.clientHeight}px`;

    emoticonMenu.addEventListener("click", (e) => {
      const clientClicked = e.target.getAttribute("class");
      if (clientClicked === "emoticon") {
        const emojiCopy = e.target.cloneNode(true);
        User.DOM.input.value += emojiCopy.textContent;
      }
    });
    User.DOM.emoticonMenuOpen = true;
  } else {
    Messenger.DOM.emoticonToggle.classList.remove("active-star");
    document.querySelector(".emoticon-menu").remove();
    User.DOM.emoticonMenuOpen = false;
  }
});

//Change Name
Lobby.DOM.changeName.addEventListener("click", () => {
  if (!User.DOM.enterName.value) return;
  User.DOM.name = User.DOM.enterName.value;
  location.reload();
});

//Delete History

Lobby.DOM.deleteHistory.addEventListener("click", () => {
  Lobby.showModal();
});

Lobby.DOM.confirmYesButton.addEventListener("click", () => {
  localStorage.clear();
  Lobby.hideModal();
  location.reload();
});

Lobby.DOM.confirmNoButton.addEventListener("click", () => {
  Lobby.hideModal();
});

window.addEventListener("click", (e) => {
  if (e.target === Lobby.modal) {
    Lobby.hideModal();
  }
});

//Lobby options settings toggle listener

for (let setting in User.settings) {
  const option = User.settings[setting];
  optionsToggle(option);
}
