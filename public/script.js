import User from "./modules/User.js";
import Messenger from "./modules/Messenger.js";
import Lobby from "./modules/Lobby.js";
import { sounds } from "./scripts/utilities.js";

const countContainer = document.querySelector(".count-container");
const countDisplay = document.createElement("p");

const displayChatHistory = User.loadHistory();

if (displayChatHistory) {
  displayChatHistory.forEach((msgObj) => {
    Messenger.output(msgObj.name, msgObj.message, msgObj.date);
  });
}

socket.on("userCount", (userCount) => {
  if (!userCount) return;
  console.log("count event received from server emitter");
  countDisplay.textContent = `${userCount} ${
    userCount > 1 ? "users" : "user"
  } active`;
  countDisplay.setAttribute("class", "user-input");
  countDisplay.setAttribute("id", "count-text");
  countContainer.appendChild(countDisplay);
});

socket.emit("userJoined", User.name);

socket.on("userJoined", (allUsers) => {
  // sounds.user_enter.play();

  if (!allUsers) return;

  const userStatus = allUsers.find((user) => user.id === socket.id).status;
  const userName = allUsers.find((user) => user.id === socket.id).name;
  const lobbyNames = allUsers.map((user) => user.name).join(", ");

  if (userStatus === "Anonymous") User.name = userName;

  Lobby.userList.textContent = lobbyNames;

  console.log(User.name);
});

socket.on("message", (data) => {
  const { name, message, date } = data;
  Messenger.output(name, message, date);
  User.updateHistory(name, message, date);
});
