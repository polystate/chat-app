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

function clearPlaceholder(elem) {
  const initialPlaceholder = elem.placeholder;

  elem.addEventListener("focus", () => {
    elem.placeholder = "";
  });

  elem.addEventListener("blur", () => {
    elem.placeholder = initialPlaceholder;
  });
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

export { formatDate, clearPlaceholder, emoticons, sounds };
