function User() {
  const settings = {
    sounds: {
      name: "sound",
      on: true,
      elem: document.getElementById("sound-toggle"),
    },
    alerts: {
      name: "alert",
      on: true,
      elem: document.getElementById("alert-toggle"),
    },
    events: {
      name: "event",
      on: false,
      elem: document.getElementById("event-toggle"),
    },
    fog: { name: "fog", on: true, elem: document.getElementById("fog-toggle") },
  };

  const DOM = {
    //DOM Retrieval
    messageHistory: JSON.parse(localStorage.getItem("messageHistory")) || [],

    //User inputs specific to Messenger
    // const enterName = document.querySelectorAll(".user-input")[0];
    enterName: document.getElementById("enter-name"),
    hamburger: document.querySelector(".hamburger-menu"),

    //DOM Retrieval for User Name
    name: localStorage.getItem("userName"),

    //DOM Element for messenger
    input: document.getElementById("type-message"),

    //Boolean switch toggles for the different menus (might also be for Messenger)
    emoticonMenuOpen: false,
    hamburgerMenuOpen: false,
    isMenuDisplayed: true,
  };

  //DOM Storage/Retrieval Methods with localStorage
  const storeName = (newName) => {
    console.log(newName);
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
    DOM.messageHistory.push({ name: name, message: message, date: date });

    localStorage.setItem("messageHistory", JSON.stringify(DOM.messageHistory));
  };

  //THe main useful and relevant User method compared to the other, getting current location
  const getCurrentLoc = () => {
    const messagesContainer = document.querySelector(".messages-container");
    if (messagesContainer.style.display === "none") {
      return "lobby";
    } else return "chat";
  };

  return {
    DOM,
    storeName,
    loadHistory,
    updateHistory,
    getCurrentLoc,
    settings,
  };
}

export default User();
