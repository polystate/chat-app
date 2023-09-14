import User from "./User";

function Lobby() {
  const aliasDisplay = document.querySelector(".alias-name");
  aliasDisplay.textContent = User.name || "Anon";
  const userList = document.querySelector(".user-list");
  const dropDown = document.querySelector(".dropdown");
  const lobbyContainer = document.querySelector(".lobby-container");

  const appendOption = (userName) => {
    const option = document.createElement("option");
    option.value = User.name;
    option.textContent = User.name;
    // dropDown.appendChild(option);
  };

  return { aliasDisplay, userList, dropDown, lobbyContainer, appendOption };
}

export default Lobby();
