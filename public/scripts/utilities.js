function generateSVG(menu, name) {
  const SVG = document.createElement("img");
  SVG.setAttribute("src", `./svg/${name}.svg`);
  SVG.setAttribute("class", "svg");
  menu.appendChild(SVG);
}

function generateAllSVGs(menu, nameArr) {
  for (let i = 0; i < nameArr.length; i++) {
    generateSVG(menu, nameArr[i]);
  }
}

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

export { generateSVG, generateAllSVGs, formatDate };
