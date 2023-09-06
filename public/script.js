import Messenger from "./modules/Messenger.js";
import { sounds } from "./scripts/utilities.js";

const countContainer = document.querySelector(".count-container");
const countDisplay = document.createElement("p");

socket.on("userJoined", () => {
  sounds.user_enter.play();
});

socket.on("message", (data) => {
  const { name, message, date } = data;
  Messenger.outputMessage(name, message, date);
});

socket.on("userCount", (userCount) => {
  countDisplay.textContent = `${userCount} ${
    userCount > 1 ? "users" : "user"
  } active`;
  countDisplay.setAttribute("class", "user-input");
  countDisplay.setAttribute("id", "count-text");
  countContainer.appendChild(countDisplay);
});
