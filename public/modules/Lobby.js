function Lobby() {
  const DOM = {
    aliasDisplay: document.querySelector(".alias-name"),
    userList: document.querySelector(".user-list"),
    dropDown: document.querySelector(".dropdown"),
    lobbyContainer: document.querySelector(".lobby-container"),
    changeName: document.getElementById("change-name"),
    deleteHistory: document.getElementById("delete-history"),
    modal: document.getElementById("confirmation-modal"),
    confirmYesButton: document.getElementById("confirm-yes"),
    confirmNoButton: document.getElementById("confirm-no"),
  };

  const showModal = () => {
    DOM.modal.style.display = "block";
  };

  const hideModal = () => {
    DOM.modal.style.display = "none";
  };

  return {
    DOM,
    showModal,
    hideModal,
  };
}

export default Lobby();
