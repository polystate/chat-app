function User() {
  const settings = {
    sounds: true,
    alerts: true,
    events: false,
    fog: true,
  };

  const messageHistory =
    JSON.parse(localStorage.getItem("messageHistory")) || [];
  const enterName = document.querySelectorAll(".user-input")[0];
  const hamburger = document.querySelector(".hamburger-menu");

  let name = localStorage.getItem("userName");
  let input = document.querySelectorAll(".user-input")[1];
  let menuOpen = false;
  let hamburgerMenuOpen = false;
  let isMenuDisplayed = true;

  const storeName = (newName) => {
    localStorage.setItem("userName", newName);
  };

  const loadHistory = () => {
    const savedMessages = localStorage.getItem("messageHistory");
    if (savedMessages) {
      const parseMessages = JSON.parse(savedMessages);
      return parseMessages;
    } else {
      console.log("First time for browser. No history.");
    }
  };

  const updateHistory = (name, message, date) => {
    messageHistory.push({ name: name, message: message, date: date });
    localStorage.setItem("messageHistory", JSON.stringify(messageHistory));
  };

  const getCurrentLoc = () => {
    const messagesContainer = document.querySelector(".messages-container");
    if (messagesContainer.style.display === "none") {
      return "lobby";
    } else return "chat";
  };

  return {
    name,
    input,
    menuOpen,
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
