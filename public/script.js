import User from './modules/User.js';
import Messenger from './modules/Messenger.js';
import Lobby from './modules/Lobby.js';
import { sounds } from './scripts/utilities.js';

const countContainer = document.querySelector('.count-container');
const countDisplay = document.createElement('p');

const displayChatHistory = User.loadHistory();

if (displayChatHistory) {
  displayChatHistory.forEach((msgObj) => {
    Messenger.output(msgObj.name, msgObj.message, msgObj.date);
  });
}

socket.emit('userJoined', User.name);

socket.on('userJoined', (allUsers) => {
  sounds.user_enter.play();

  Lobby.userList.textContent = `${User.name}, `;

  allUsers.forEach((user) => {
    if (User.name === user.name) {
      return;
    }

    Lobby.userList.textContent += `${user.name}, `;
  });

  Lobby.userList.textContent = Lobby.userList.textContent.slice(0, -2);
});

socket.on('message', (data) => {
  const { name, message, date } = data;
  Messenger.output(name, message, date);
  User.updateHistory(name, message, date);
});

socket.on('userCount', (userCount) => {
  countDisplay.textContent = `${userCount} ${
    userCount > 1 ? 'users' : 'user'
  } active`;
  countDisplay.setAttribute('class', 'user-input');
  countDisplay.setAttribute('id', 'count-text');
  countContainer.appendChild(countDisplay);
});
