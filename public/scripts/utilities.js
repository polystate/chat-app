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
    Messenger.emoticonToggle.classList.remove("active-star");
    const emoticonMenu = document.querySelector(".emoticon-menu");
    if (emoticonMenu) emoticonMenu.remove();
    User.emoticonMenuOpen = false;
  }
}

function handleSendMessage(e) {
  e.preventDefault();
  Messenger.send(User.input, User.name);
  userLocEmotToggle();
}

const sounds = {
  message_sent: new Audio("../sounds/message_sent.mp3"),
  user_enter: new Audio("../sounds/user_enter.mp3"),
  hold_emoticon: new Audio("../sounds/user_hold_emoticon.mp3"),
};

for (const key in sounds) {
  if (sounds.hasOwnProperty(key)) {
    sounds[key].volume = 0.25;
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

export { formatDate, clearPlaceholder, handleSendMessage, emoticons, sounds };
