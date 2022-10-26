const endpointToChange = 'https://www.cheapshark.com/api/1.0/games?id=612';
const gamepoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const storepoint = 'https://www.cheapshark.com/api/1.0/stores';
const gameId = localStorage.getItem('idToPass');
const inputValue = localStorage.getItem('searchValue');
const listValue = JSON.parse(localStorage.getItem('mainSearchItems'));
const regexID = /[0-9]+$/;
const endpoint = endpointToChange.replace(regexID, gameId);
const games = [];
const dealsDiv = document.querySelector('.dealInfo');
const listSearch = document.querySelector('.listNav');
const inputGame = document.querySelector('.textGame');
const form = document.querySelector('.listGameBar');
const logo = document.querySelectorAll('.logo');
const displayGames = inputValue;
inputGame.value = displayGames;
let showData;

// console.log(dealsAndStores);

// fetch the full game list 
fetch(gamepoint)
    .then(res => res.json())
    .then(data => games.push(...data))
    .catch((err) => console.warn(err))

// fetch the specific game
const dealsData = fetch(endpoint)
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

Promise.all([dealsData, storesData])
    .then(([dealItems, storeItems]) => createElements(dealItems, storeItems))
    .catch(err => console.error(err));

// match input with game.title property
function searchData(input, value) {
    return value.filter(game => {
        const regex = new RegExp (input, 'gi');
        return game.title.match(regex);
    });
}

// display data in DOM
function displayData() {
    const matchedArray = searchData(this.value, games);
    if (inputGame.value) {
        showData = matchedArray
            .slice(0, 5)
            .map((games) => {
                return `
                    <li class="navListDisplay" data-index="${games.gameID}">
                        <a href="deal-page.html" class="linkNav" data-index="${games.gameID}">
                            <span lass="navListTitle" data-index="${games.gameID}">${games.title}</span>
                        </a>
                    </li>
                `
            }).join('');
    } else {
        showData = matchedArray.slice(0, 0);
    }
    localStorage.setItem('mainSearchItems', JSON.stringify(matchedArray));
    listSearch.innerHTML = showData;
}

// map the specific game info
function createElements(dealItems, storeItems) {
    let stores = storeItems;
    let deals = [dealItems];
    const specificDeals = deals[0].deals;
    specificDeals.forEach(deal => {
       stores.forEach(store => {
        if (deal.storeID === store.storeID) {
            deal.images = store.images;
        }
       });
    });
    dealsDiv.innerHTML = deals.map(game => {
        return `
            <div class="dealsList">
                <div class="dealDiv">
                    <img src="${game.info.thumb}" class="imgDeal">
                </div>
                <div class="infoDiv">
                    <div class="infoText gameName">${game.info.title}</div>
                    <div class="infoText">
                        Normal Price: $${game.deals[0].retailPrice}
                    </div>
                    <div class="infoText">
                        Deal Price:<span class="discountPrice">$${game.deals[0].price} -${Math.round(game.deals[0].savings)}%</span>
                        <span class="dealLink">
                            <a href="https://www.cheapshark.com/redirect?dealID=${game.deals[0].dealID}">
                                <img src="https://www.cheapshark.com${game.deals[0].images.banner}" class="imgBanner">
                            </a>
                        </span>
                    </div>
                    <div class="infoText">
                        Lowest price ever: $${game.cheapestPriceEver.price} on ${createDate(game.cheapestPriceEver.date)}
                    </div>
                </div>
            </div>
        `
    }).join('');
    console.log(deals);
}

// convert date from ms
function createDate(value) {
    let date = new Date(value * 1000);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear(); 
    if (day < 10) {
       day = 0 + day;
    } 
    if (month < 10) {
        month = 0 + month;
    }
    return day + '/' + month + '/' + year;
}

// submit search bar form and load results
function submitForm(e) {
    e.preventDefault();
    const valueInput = inputGame.value;
    localStorage.setItem('searchValue', valueInput);
    window.location = 'game-list.html';
    if (showData.length == 0) {
        window.location = 'error-page.html';
    }
}

// submit the search bar form and go to specific game page
function gameInfo(e) {
    const gameId = e.target.dataset.index;
    localStorage.setItem('idToPass', gameId);
    console.log(gameId);
}

// stops propagation and hides the list
function stopPropagation(e) {
    e.stopPropagation();
    listSearch.classList.remove('hide');
}

dealsDiv.addEventListener('load', createElements);
inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('click', displayData);
listSearch.addEventListener('click', gameInfo);
listSearch.addEventListener('mouseover', gameInfo);
form.addEventListener('submit', submitForm);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
logo.forEach(logo => logo.addEventListener('click', () => window.location = 'index.html'));
document.body.addEventListener('click', () => listSearch.classList.add('hide'));


