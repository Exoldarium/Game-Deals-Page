const endpoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const games = [];
const inputValue = localStorage.getItem('searchValue');
const listValue = JSON.parse(localStorage.getItem('mainSearchItems'));
const inputGame = document.querySelector('.textGame');
const list = document.querySelector('.gameList');
const listSearch = document.querySelector('.listNav');
const form = document.querySelector('.listGameBar');
const range = document.querySelector('.rangeInput');
const rating = document.querySelector('.ratingRange');
const ascending = document.querySelector('.ascending');
const descending = document.querySelector('.descending');
const labelRange = document.querySelector('.rangeLabel');
let listDiv = document.querySelector('.listGame');
// add local storage to new variable
const displayGames = inputValue;
// pass local storage as input
inputGame.value = displayGames;
let rangeValue = range.value;

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

// display data in DOM (page)
function mapGames() {   
    list.innerHTML = listValue.slice(0, 15).map(games => {
        return `
            <li class="gameDisplay" data-index="${games.gameID}">
                <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                    <span class="gameTitle" data-index="${games.gameID}">
                        <div class="imageDiv" data-index="${games.gameID}">
                            <img src="${games.thumb}" class="imgList" data-index="${games.gameID}"></img>
                        </div>
                        <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                    </span>
                    <span class="priceSpan" data-index="${games.gameID}">$${games.salePrice}</span>
                </a>
            </li>
        `
    }).join('');
}

// submit form and load results on this page
function submitForm(e) {
    e.preventDefault();
    const valueInput = inputGame.value;
    localStorage.setItem('searchValue', valueInput);
    localStorage.setItem('rangeValue', range.value);
    window.location = 'game-list.html';   
}

// submit the search bar form and go to specific game page
function gameInfo(e) {
    const gameId = e.target.dataset.index;
    localStorage.setItem('idToPass', gameId);
    window.location = 'deal-page.html';
    console.log(gameId);
}

// filter by price
function priceSort() {
    const rangeValue = range.value;
    const filterGames = listValue.filter(games => games.salePrice <= rangeValue);
    const label = document.querySelector('.rangeLabel');
    list.innerHTML = filterGames.map(games => {
        return `
            <li class="gameDisplay" data-index="${games.gameID}">
                <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                    <span class="gameTitle" data-index="${games.gameID}">
                        <div class="imageDiv" data-index="${games.gameID}">
                            <img src="${games.thumb}" class="imgList" data-index="${games.gameID}"></img>
                        </div>
                        <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                    </span>
                    <span class="priceSpan" data-index="${games.gameID}">$${games.salePrice}</span>
                </a>
            </li>
        `
    }).join('');
    console.log({rangeValue, filterGames});
    label.textContent = '$' + `${rangeValue}`;
    localStorage.setItem('mainSearchItems', JSON.stringify(filterGames));
    localStorage.setItem('rangeValue', rangeValue);
}

// price ascending
function priceAscend() {
    const filterSale = listValue.sort((games, price) => games.salePrice - price.salePrice);
    list.innerHTML = filterSale.map(games => {
        return `
            <li class="gameDisplay" data-index="${games.gameID}">
                <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                    <span class="gameTitle" data-index="${games.gameID}">
                        <div class="imageDiv" data-index="${games.gameID}">
                            <img src="${games.thumb}" class="imgList" data-index="${games.gameID}"></img>
                        </div>
                        <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                    </span>
                    <span class="priceSpan" data-index="${games.gameID}">$${games.salePrice}</span>
                </a>
            </li>
        `
    }).join('');
    priceSort();
}

// price descending
function priceDescend() {
    const filterSale = listValue.sort((games, price) => price.salePrice - games.salePrice);
    list.innerHTML = filterSale.map(games => {
        return `
            <li class="gameDisplay" data-index="${games.gameID}">
                <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                    <span class="gameTitle" data-index="${games.gameID}">
                        <div class="imageDiv" data-index="${games.gameID}">
                            <img src="${games.thumb}" class="imgList" data-index="${games.gameID}"></img>
                        </div>
                        <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                    </span>
                    <span class="priceSpan" data-index="${games.gameID}">$${games.salePrice}</span>
                </a>
            </li>
        `
    }).join('');
    priceSort();
}

// save the input value
function saveInputValue() {
    range.value = localStorage.getItem('rangeValue');
    labelRange.textContent = '$' + `${range.value}`;
}

// stops propagation and hides the list
function stopPropagation(e) {
    e.stopPropagation();
    listSearch.classList.remove('hide');
}

console.log(listValue);
inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('change', displayData);
inputGame.addEventListener('mouseup', displayData);
form.addEventListener('submit', submitForm);
list.addEventListener('mouseup', gameInfo);
ascending.addEventListener('click', priceAscend);
descending.addEventListener('click', priceDescend);
listSearch.addEventListener('mouseup', gameInfo);
range.addEventListener('change', priceSort);
window.addEventListener('load', mapGames);
window.addEventListener('change', saveInputValue);
window.addEventListener('load', saveInputValue);
window.addEventListener('load', priceSort);
document.body.addEventListener('click', function removeList() {
    listSearch.classList.add('hide');
});
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);

// add options on the side to filter by name, price up and down and release date, move the price slider too, make them into a list so that the user can select only one option
// figure how to hide dropdown list when clicking outside of it
// front page should have on sale link, aaa link and a random game link






