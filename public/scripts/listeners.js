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

Messenger.btnSend.addEventListener("click", handleSendMessage);

//Enter name input

User.enterName.addEventListener("input", (e) => {
  User.name = e.target.value;
  User.storeName(e.target.value);
  Lobby.aliasDisplay.textContent = e.target.value || "Anon";
  console.log(Lobby.saveChanges);
});

//Toggle main menu

User.hamburger.addEventListener("click", () => {
  setTimeout(() => {
    if (User.isMenuDisplayed) {
      /*Navigated to Chat*/
      document.getElementById("enter-name").style.display = "block";
      document.getElementById("current-name").style.display = "none";
      Messenger.messagesContainer.style.display = "none";
      Lobby.lobbyContainer.style.display = "flex";
      Messenger.chatWindow.scrollTop = 0;
    } else {
      /*Navigated to Lobby*/
      const currentName = document.getElementById("current-name");
      document.getElementById("enter-name").style.display = "none";
      currentName.style.display = "block";
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

//Change Name
Lobby.changeName.addEventListener("click", () => {
  if (!User.enterName.value) return;
  User.name = User.enterName.value;
  location.reload();
});

//Delete History

Lobby.deleteHistory.addEventListener("click", () => {
  Lobby.showModal();
});

Lobby.confirmYesButton.addEventListener("click", () => {
  localStorage.clear();
  Lobby.hideModal();
  location.reload();
});

Lobby.confirmNoButton.addEventListener("click", () => {
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
