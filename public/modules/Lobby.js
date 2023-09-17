import User from "./User";

function Lobby() {
  const aliasDisplay = document.querySelector(".alias-name");
  aliasDisplay.textContent = User.name || "Anon";
  const userList = document.querySelector(".user-list");
  const dropDown = document.querySelector(".dropdown");
  const lobbyContainer = document.querySelector(".lobby-container");
  const saveChanges = document.getElementById("save-changes");
  const deleteHistory = document.getElementById("delete-history");
  const modal = document.getElementById("confirmation-modal");
  const confirmYesButton = document.getElementById("confirm-yes");
  const confirmNoButton = document.getElementById("confirm-no");

  const appendOption = (userName) => {
    const option = document.createElement("option");
    option.value = User.name;
    option.textContent = User.name;
    // dropDown.appendChild(option);
  };

  const showModal = () => {
    modal.style.display = "block";
  };

  const hideModal = () => {
    modal.style.display = "none";
  };

  return {
    aliasDisplay,
    userList,
    dropDown,
    lobbyContainer,
    modal,
    confirmYesButton,
    confirmNoButton,
    showModal,
    hideModal,
    saveChanges,
    deleteHistory,
    appendOption,
  };
}

export default Lobby();
