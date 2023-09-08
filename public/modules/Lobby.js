import User from "./User";

function Lobby() {
  const aliasDisplay = document.querySelector(".alias-name");
  aliasDisplay.textContent = User.name || "Anon";

  return { aliasDisplay };
}

export default Lobby();
