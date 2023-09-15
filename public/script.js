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
  console.log("count event received from server emitter");
  Messenger.countDisplay.textContent = `${userCount} ${
    userCount > 1 ? "users" : "user"
  } active`;
  Messenger.countDisplay.setAttribute("class", "user-input");
  Messenger.countDisplay.setAttribute("id", "count-text");
  Messenger.countContainer.appendChild(Messenger.countDisplay);
});

socket.emit("userJoined", User.name);

socket.on("userJoined", (allUsers) => {
  sounds.user_enter.play();

  if (!allUsers) return;
  console.log(allUsers);

  const userStatus =
    allUsers.find((user) => user.id === socket.id).status || "Unknown";
  const userName = allUsers.find((user) => user.id === socket.id).name;
  const lobbyNames = allUsers.map((user) => user.name).join(", ");

  if (userStatus === "Anonymous") User.name = userName;

  Lobby.userList.textContent = lobbyNames;
});

socket.on("message", (data) => {
  const { name, message, date } = data;
  Messenger.output(name, message, date);
  User.updateHistory(name, message, date);
});

clearPlaceholder(User.enterName);
clearPlaceholder(User.input);
