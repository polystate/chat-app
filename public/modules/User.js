function User() {
  const settings = {
    sounds: { on: true, elem: document.getElementById("sound-toggle") },
    alerts: { on: true, elem: document.getElementById("alert-toggle") },
    events: { on: false, elem: document.getElementById("event-toggle") },
    fog: { on: true, elem: document.getElementById("fog-toggle") },
  };

  //DOM Retrieval
  const messageHistory =
    JSON.parse(localStorage.getItem("messageHistory")) || [];

  //User inputs specific to Messenger
  // const enterName = document.querySelectorAll(".user-input")[0];
  const enterName = document.getElementById("enter-name");
  const hamburger = document.querySelector(".hamburger-menu");

  //DOM Retrieval for User Name
  let name = localStorage.getItem("userName");

  //DOM Element for messenger
  let input = document.getElementById("type-message");

  //Boolean switch toggles for the different menus (might also be for Messenger)
  let emoticonMenuOpen = false;
  let hamburgerMenuOpen = false;
  let isMenuDisplayed = true;

  //DOM Storage/Retrieval Methods with localStorage
  const storeName = (newName) => {
    localStorage.setItem("userName", newName);
  };

  const loadHistory = () => {
    const savedMessages = localStorage.getItem("messageHistory");
    if (savedMessages) {
      const parseMessages = JSON.parse(savedMessages);
      return parseMessages;
    } else {
      // console.log("First time for browser. No history.");
    }
  };

  const updateHistory = (name, message, date) => {
    messageHistory.push({ name: name, message: message, date: date });
    localStorage.setItem("messageHistory", JSON.stringify(messageHistory));
  };

  //THe main useful and relevant User method compared to the other, getting current location
  const getCurrentLoc = () => {
    const messagesContainer = document.querySelector(".messages-container");
    if (messagesContainer.style.display === "none") {
      return "lobby";
    } else return "chat";
  };

  return {
    name,
    input,
    emoticonMenuOpen,
    hamburgerMenuOpen,
    enterName,
    storeName,
    loadHistory,
    messageHistory,
    updateHistory,
    hamburger,
    isMenuDisplayed,
    getCurrentLoc,
    settings,
  };
}

export default User();
