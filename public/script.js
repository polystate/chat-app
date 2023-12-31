import User from "./modules/User.js";
import Messenger from "./modules/Messenger.js";
import Lobby from "./modules/Lobby.js";
import { sounds, clearPlaceholder } from "./scripts/utilities.js";

if (User.loadHistory()) {
  User.loadHistory().forEach((msgObj) => {
    Messenger.output(msgObj.name, msgObj.message, msgObj.date);
  });
}

socket.on("userCount", (userCount) => {
  if (!userCount) return;
  Messenger.DOM.countDisplay.textContent = `${userCount} ${
    userCount > 1 ? "users" : "user"
  } active`;
  Messenger.DOM.countDisplay.setAttribute("class", "user-input");
  Messenger.DOM.countDisplay.setAttribute("id", "count-text");
  Messenger.DOM.countContainer.appendChild(Messenger.DOM.countDisplay);
});

socket.emit("userJoined", User.DOM.name);

socket.on("userJoined", (allUsers) => {
  // sounds.user_enter.play();

  if (!allUsers) return;

  const userStatus =
    allUsers.find((user) => user.id === socket.id).status || "Unknown";
  const userName = allUsers.find((user) => user.id === socket.id).name;
  const lobbyNames = allUsers.map((user) => user.name).join(", ");

  if (userStatus === "Anonymous") User.name = userName;

  Lobby.DOM.userList.textContent = lobbyNames;
});

socket.on("lobbyList", (allUsers) => {
  if (!allUsers) return;

  const userStatus =
    allUsers.find((user) => user.id === socket.id).status || "Unknown";
  const userName = allUsers.find((user) => user.id === socket.id).name;
  const lobbyNames = allUsers.map((user) => user.name).join(", ");

  if (userStatus === "Anonymous") User.name = userName;

  Lobby.DOM.userList.textContent = lobbyNames;
});

socket.on("message", (data) => {
  const { name, message, date } = data;
  Messenger.output(name, message, date);
  User.updateHistory(name, message, date);
});

clearPlaceholder(User.DOM.enterName);
clearPlaceholder(User.DOM.input);
