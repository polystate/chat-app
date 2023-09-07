function User() {
  const messageHistory =
    JSON.parse(localStorage.getItem("messageHistory")) || [];
  const enterName = document.querySelectorAll(".user-input")[0];
  const hamburger = document.querySelector(".hamburger-menu");

  let name = localStorage.getItem("userName") || "";
  let input = document.querySelectorAll(".user-input")[1];
  let menuOpen = false;
  let hamburgerMenuOpen = false;

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
  };
}

export default User();
