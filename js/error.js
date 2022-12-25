import { displayData, mapRandomGame, gameInfo, stopPropagation, removeActiveList } from "./modules/mainFunctionsModule.js";

const randomGameList = document.querySelector('.randomGame');
const inputValue = localStorage.getItem('searchValue'); // get the value that was typed in the search bar
const inputGame = document.querySelector('.textGame');
const listSearch = document.querySelector('.listNav');
const form = document.querySelector('.listGameBar');
const logo = document.querySelectorAll('.logo');
const submitButton = document.querySelector('.submit');
const displayGames = inputValue;
inputGame.value = displayGames;

// submit form and save form input value in localStorage, if the list gives no results go to error page
function submitForm(e) {
  e.preventDefault();
  const listValue = JSON.parse(localStorage.getItem('mainSearchItems'));
  const valueInput = inputGame.value;
  localStorage.setItem('searchValue', valueInput);
  if (listValue.length < 1) {
    window.location = 'error-page.html';
  }
  if (listValue.length >= 1) {
    window.location = 'game-list.html';
  }
  mapRandomGame();
}

inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('click', displayData);
listSearch.addEventListener('click', gameInfo);
listSearch.addEventListener('mouseover', gameInfo);
form.addEventListener('submit', submitForm);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
submitButton.addEventListener('click', submitForm);
randomGameList.addEventListener('mouseover', mapRandomGame);
window.addEventListener('load', removeActiveList);
logo.forEach(logo => logo.addEventListener('click', () => window.location = 'index.html'));
document.body.addEventListener('click', () => listSearch.classList.add('hide'));