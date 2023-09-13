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

socket.emit("userJoined", User.name);

socket.on("userJoined", (allUsers) => {
  // sounds.user_enter.play();

  //issue is that anonymous name is returning null instead of the Anon string so we can't set it to localStorage here so that it appears in chat
  //check if status is anonymous, if so set User.name to the anonymous name directly so that Anon_3312 or whatever appears in chat
  //Anon name (without id) still being used becuase it gets overwritten in short circuit operator in User later
  //there shouldn't be a lobby displayname, it's just unnecessary overhead, everything shuold be routed through here through localStorage and getStorage for both anonymous/logged user name. both chat and lobby display name should both be routed by User.name, and User.name when program first starts gets its name value from localStorage

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

socket.on("userCount", (userCount) => {
  countDisplay.textContent = `${userCount} ${
    userCount > 1 ? "users" : "user"
  } active`;
  countDisplay.setAttribute("class", "user-input");
  countDisplay.setAttribute("id", "count-text");
  countContainer.appendChild(countDisplay);
});
