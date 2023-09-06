function User() {
  const enterName = document.querySelectorAll(".user-input")[0];
  let name = "";
  let input = document.querySelectorAll(".user-input")[1];
  let menuOpen = false;

  return { name, input, menuOpen, enterName };
}

export default User();
