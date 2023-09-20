import User from "../modules/User";
import Messenger from "../modules/Messenger";

function formatDate(date) {
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "P.M." : "A.M.";
  const formattedHours = hours % 12 || 12;
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year} - ${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;
}

function clearPlaceholder(input) {
  const initialPlaceholder = input.placeholder;

  input.addEventListener("focus", () => {
    input.placeholder = "";
  });

  input.addEventListener("blur", () => {
    input.placeholder = initialPlaceholder;
  });
}

function userLocEmotToggle() {
  if (User.getCurrentLoc() === "chat") {
    Messenger.DOM.emoticonToggle.classList.remove("active-star");
    const emoticonMenu = document.querySelector(".emoticon-menu");
    if (emoticonMenu) emoticonMenu.remove();
    User.DOM.emoticonMenuOpen = false;
  }
}

function handleSendMessage(e) {
  e.preventDefault();
  if (User.getCurrentLoc() === "lobby" && User.DOM.input.value) {
    document.querySelector(".lobby-container").style.display = "none";
    document.querySelector(".messages-container").style.display = "block";
    document.getElementById("enter-name").style.display = "none";
    document.getElementById("current-name").style.display = "block";
    User.DOM.isMenuDisplayed = !User.DOM.isMenuDisplayed;
  }
  Messenger.send(User.DOM.input, User.DOM.name);
  userLocEmotToggle();
}

function optionsToggle(option) {
  option.elem.addEventListener("click", (e) => {
    option.on = !option.on;
    handleSetting(option);
  });
}

function handleSetting(option) {
  switch (option.name) {
    case "sound":
      option.on ? adjustVolume(0.25) : adjustVolume(0);
      break;
    case "alert":
      break;
    case "fog":
      const nav = document.querySelector("nav");
      nav.style.boxShadow = option.on ? "0 10px 10px" : "none";
      break;
    case "event":
      break;
    default:
      console.log("Option not found.");
  }
}

const sounds = {
  message_sent: new Audio("../sounds/message_sent.mp3"),
  user_enter: new Audio("../sounds/user_enter.mp3"),
  hold_emoticon: new Audio("../sounds/user_hold_emoticon.mp3"),
};

adjustVolume(0.25);

function adjustVolume(level) {
  for (const key in sounds) {
    if (sounds.hasOwnProperty(key)) {
      sounds[key].volume = level;
    }
  }
}

const emoticons = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😜",
  "😝",
  "🤑",
  "🤗",
  "🤓",
  "😎",
  "🤡",
  "🤠",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "😤",
  "😠",
  "😡",
  "😶",
  "😐",
  "😑",
  "😬",
  "😮",
  "😯",
];

export {
  formatDate,
  clearPlaceholder,
  handleSendMessage,
  optionsToggle,
  emoticons,
  sounds,
};
