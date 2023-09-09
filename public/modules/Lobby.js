import User from "./User";

function Lobby() {
  const aliasDisplay = document.querySelector(".alias-name");
  aliasDisplay.textContent = User.name || "Anon";
  const userList = document.querySelector(".user-list");
  // userList.textContent = User.name;

  return { aliasDisplay, userList };
}

export default Lobby();
