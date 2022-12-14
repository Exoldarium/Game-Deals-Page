import { displayData, gameInfo, stopPropagation } from "./modules/mainFunctionsModule.js";

const endpointToChange = 'https://www.cheapshark.com/api/1.0/games?id=612';
const storepoint = 'https://www.cheapshark.com/api/1.0/stores';
const gameId = localStorage.getItem('idToPass'); // get the game id
const regexID = /[0-9]+$/; // remove the id part from the enpointToChange variable
const gamepoint = endpointToChange.replace(regexID, gameId); // replace it with the game id from localStorag
const dealsDiv = document.querySelector('.dealsList');
const allDeals = document.querySelector('.allDealsList');
const listSearch = document.querySelector('.listNav');
const inputGame = document.querySelector('.textGame');
const form = document.querySelector('.listGameBar');
const logo = document.querySelectorAll('.logo');
const spanActive = document.querySelector('.spanDealsTitle');
const submitButton = document.querySelector('.submit');
const logoImg = document.querySelector('.logoIMG');

// fetch the specific game
const dealsData = fetch(gamepoint)
  .then(res => res.json())
  .then(data => {
    return data;
  })
  .catch((err) => console.warn(err))

// fetch the stores
const storesData = fetch(storepoint)
  .then(res => res.json())
  .then(value => {
    return value;
  })
  .catch((err) => console.warn(err))

// combined returned promises and add them as function variables to be used later
Promise.all([dealsData, storesData])
  .then(([dealItems, storeItems]) => createElements(dealItems, storeItems))
  .catch(err => console.error(err));

// map the specific game info
function createElements(dealItems, storeItems) {
  // add returned promises to variables
  let stores = storeItems;
  let deals = [dealItems];
  // get only the .deals from the array
  const specificDeals = deals[0].deals;
  // push images from the store array to deals array
  specificDeals.forEach(deal => {
    stores.forEach(store => {
      if (deal.storeID === store.storeID) {
        deal.images = store.images;
      }
    });
  });
  // map the lowest priced deal, add the correct store image
  dealsDiv.innerHTML = deals.map(game => {
    return `
      <div class="dealDiv">
        <img src="${game.info.thumb}" class="imgDeal">
      </div>
      <div class="infoDiv">
        <div class="infoText gameName">${game.info.title}</div>
        <div class="infoText">
          <span>Normal Price: $${game.deals[0].retailPrice}</span>
        </div>
        <div class="infoText">
          Best Deal: <span>$${game.deals[0].price}<span class="discountPrice">-${Math.round(game.deals[0].savings)}%</span></span>
          <span class="dealLink">
            <a href="https://www.cheapshark.com/redirect?dealID=${game.deals[0].dealID}">
              <img src="https://www.cheapshark.com${game.deals[0].images.banner}" class="imgBanner">
            </a>
          </span>
        </div>
        <div class="infoText">
          <span>Lowest price ever: $${game.cheapestPriceEver.price} on ${createDate(game.cheapestPriceEver.date)}</span>
        </div>
      </div>
    `
  }).join('');
  // map all the other deals, add the correct store image
  allDeals.innerHTML = specificDeals
    .slice(1)
    .map(game => {
      return `
        <li class="allDealsList">
          <a href="https://www.cheapshark.com/redirect?dealID=${game.dealID}" class="allDealsListLinks">
            <img src="https://www.cheapshark.com${game.images.icon}" class="imageDealLogo">
              $${game.price} 
            <span class="discountPrice">-${Math.round(game.savings)}%</span>
          </a>
        </li>
      `
    }).join('');
}

// convert date from ms to dd/mm/yyyy
function createDate(value) {
  let date = new Date(value * 1000);
  let day = ("0" + (date.getDate() + 1)).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  return day + '/' + month + '/' + year;
}

// submit search bar form and load results, if the search gives no results load error page
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
}

// extend the game deals and show all prices
function addActiveList(e) {
  if (e.target === spanActive && screen.width > 760) {
    document.querySelector('.allDeals').style.height = 'fit-content';
    allDeals.classList.remove('activeList');
  }
}

// remove active effect when on mobile and change logo image
function removeActiveList() {
  if (screen.width <= 760) {
    allDeals.classList.remove('activeList');
    logoImg.src = 'images/titleLogo.png';
  }
}

dealsDiv.addEventListener('load', createElements);
inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('click', displayData);
listSearch.addEventListener('click', gameInfo);
listSearch.addEventListener('mouseover', gameInfo);
form.addEventListener('submit', submitForm);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
spanActive.addEventListener('click', addActiveList);
submitButton.addEventListener('click', submitForm);
logo.forEach(logo => logo.addEventListener('click', () => window.location = 'index.html'));
window.addEventListener('load', removeActiveList);
document.body.addEventListener('click', () => listSearch.classList.add('hide'));


