import { displayData, games, mapRandomGame, gameInfo, stopPropagation, removeActiveList } from "./modules/mainFunctionsModule.js";

const inputText = document.querySelector('.textGame');
const listSearch = document.querySelector('.listNav');
const form = document.querySelector('.bar');
const offers = document.querySelectorAll('.imgSale');
const randomGameList = document.querySelector('.randomGame');
const logo = document.querySelectorAll('.logo');
const submitButton = document.querySelector('.submit');

// sort based on the parameters and load next page
function mapCategory(e) {
  // depending which element user clicks
  const targetIndex = e.target.dataset.index;
  // filter games that are on sale
  if (targetIndex == 0) {
    const filter = games.filter(game => game.isOnSale);
    localStorage.setItem('mainSearchItems', JSON.stringify(filter));
  }
  // sort games based on dealRating property
  if (targetIndex == 1) {
    const filter = games.sort((firstGame, secondGame) => firstGame.dealRating - secondGame.dealRating);
    localStorage.setItem('mainSearchItems', JSON.stringify(filter));
  }
  // filter games that are free, price == 0
  if (targetIndex == 2) {
    const filter = games.filter(game => game.salePrice == 0);
    localStorage.setItem('mainSearchItems', JSON.stringify(filter));
  }
}

// submit form and load next page, if the search gives no results load error page
function submitForm(e) {
  e.preventDefault();
  const listValue = JSON.parse(localStorage.getItem('mainSearchItems'));
  const inputValue = inputText.value;
  localStorage.setItem('searchValue', inputValue);
  if (!listValue) {
    window.location = 'error-page.html';
  }
  if (listValue) {
    window.location = 'game-list.html';
  }
}

inputText.addEventListener('keyup', displayData);
inputText.addEventListener('click', displayData);
listSearch.addEventListener('mouseover', gameInfo);
listSearch.addEventListener('click', gameInfo);
form.addEventListener('submit', submitForm);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
offers.forEach(offer => offer.addEventListener('click', mapCategory));
randomGameList.addEventListener('mouseover', mapRandomGame);
submitButton.addEventListener('click', submitForm);
window.addEventListener('load', removeActiveList);
logo.forEach(logo => logo.addEventListener('click', () => window.location = 'index.html'));
document.body.addEventListener('click', () => listSearch.classList.add('hide'));
localStorage.clear();