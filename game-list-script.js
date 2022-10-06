const endpoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const games = [];
const inputValue = localStorage.getItem('objectToPass');
const listValue = JSON.parse(localStorage.getItem('objectToTransfer'));
const inputGame = document.querySelector('.textGame');
const list = document.querySelector('.gameList');
const listSearch = document.querySelector('.listNav');
const form = document.querySelector('.listGameBar');
const range = document.querySelector('.rangeInput');
const rating = document.querySelector('.ratingRange');
const onSale = document.querySelector('.checkboxInput');
let listDiv = document.querySelector('.listGame');
// add local storage to new variable
const displayGames = inputValue;
// pass local storage as input
inputGame.value = displayGames;

fetch(endpoint)
    .then(res => res.json())
    .then(data => games.push(...data))
    .catch((err) => console.warn(err))

// match input with game.title property
function searchData(input, value) {
    return value.filter(game => {
        const regex = new RegExp (input, 'gi');
        return game.title.match(regex);
    });
}

// display data in DOM (search bar)
function displayData() {
    const matchedArray = searchData(this.value, games);
    let showData;
    if (inputGame.value) {
        showData = matchedArray.slice(0, 5).map((games) => {
            return `
                <a href="deal-page.html" class="linkNav" data-index="${games.gameID}">
                    <li class="navListDisplay" data-index="${games.gameID}">
                        <span lass="navListTitle" data-index="${games.gameID}">${games.title}</span>
                    </li>
                </a>
            `
        }).join('');
    } else {
        showData = matchedArray.slice(0, 0);
    }
    localStorage.setItem('objectToTransfer', JSON.stringify(matchedArray));
    listSearch.innerHTML = showData;
}

// display data in DOM (page)
function mapGames() {   
    list.innerHTML = listValue.slice(0, 15).map(games => {
        return `
            <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                <li class="gameDisplay" data-index="${games.gameID}">
                    <span class="gameTitle" data-index="${games.gameID}">
                        <div class="imageDiv" data-index="${games.gameID}">
                            <img src="${games.thumb}" class="imgList" data-index="${games.gameID}"></img>
                        </div>
                        <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                    </span>
                    <span class="priceSpan" data-index="${games.gameID}">$${games.salePrice}</span>
                </li>
            </a>
        `
    }).join('');
}

// submit form and load results on this page
function submitForm(e) {
    e.preventDefault();
    const valueInput = inputGame.value;
    localStorage.setItem('objectToPass', valueInput);
    window.location = 'game-list.html';
}

function gameInfo(e) {
    const gameId = e.target.dataset.index;
    localStorage.setItem('idToPass', gameId);
    window.location = 'deal-page.html';
    console.log(gameId);
}

function priceSort() {
    const rangeValue = range.value;
    const filterGames = listValue.filter(games => games.salePrice <= rangeValue);
    const label = document.querySelector('.rangeLabel');
    list.innerHTML = filterGames.map(games => {
        return `
            <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                <li class="gameDisplay" data-index="${games.gameID}">
                    <span class="gameTitle" data-index="${games.gameID}">
                        <div class="imageDiv" data-index="${games.gameID}">
                            <img src="${games.thumb}" class="imgList" data-index="${games.gameID}"></img>
                        </div>
                        <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                    </span>
                    <span class="priceSpan" data-index="${games.gameID}">$${games.salePrice}</span>
                </li>
            </a>
        `
    }).join('');
    console.log({rangeValue, filterGames});
    label.textContent = '$' + `${rangeValue}`;
}

function ratingSort() {
    const ratingValue = rating.value;
    const filterRating = listValue.filter(games => games.steamRatingPercent <= ratingValue);
    const label = document.querySelector('.ratingLabel');
    list.innerHTML = filterRating.map(games => {
        return `
            <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                <li class="gameDisplay" data-index="${games.gameID}">
                    <span class="gameTitle" data-index="${games.gameID}">
                        <div class="imageDiv" data-index="${games.gameID}">
                            <img src="${games.thumb}" class="imgList" data-index="${games.gameID}"></img>
                        </div>
                        <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                    </span>
                    <span class="priceSpan" data-index="${games.gameID}">$${games.salePrice}</span>
                </li>
            </a>
        `
    }).join('');
    label.textContent = 'Steam Rating: ' + `${ratingValue}%` + ' Positive';
    console.log({ratingValue, filterRating});
}

function checkSale() {
    if(onSale.checked === true) {
        const filterSale = listValue.sort((games, price) => games.salePrice - price.salePrice);
        list.innerHTML = filterSale.map(games => {
            return `
                <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                    <li class="gameDisplay" data-index="${games.gameID}">
                        <span class="gameTitle" data-index="${games.gameID}">
                            <div class="imageDiv" data-index="${games.gameID}">
                                <img src="${games.thumb}" class="imgList" data-index="${games.gameID}"></img>
                            </div>
                            <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                        </span>
                        <span class="priceSpan" data-index="${games.gameID}">$${games.salePrice}</span>
                    </li>
                </a>
            `
        }).join('');
    } else mapGames();
}

console.log(listValue);
inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('change', displayData);
inputGame.addEventListener('mouseup', displayData);
form.addEventListener('submit', submitForm);
list.addEventListener('mouseup', gameInfo);
listSearch.addEventListener('mouseup', gameInfo);
range.addEventListener('change', priceSort);
rating.addEventListener('change', ratingSort);
onSale.addEventListener('change', checkSale);
mapGames();







