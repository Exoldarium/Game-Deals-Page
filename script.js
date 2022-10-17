const endpoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const games = [];
const inputText = document.querySelector('.text');
const list = document.querySelector('.game');
const form = document.querySelector('.bar');
const landing = document.querySelector('.formWrap');
const saleList = document.querySelector('.onSale');
const dealRatingList = document.querySelector('.dealRating');
const freeGameList = document.querySelector('.tripleA');

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

// display data in DOM
function displayData() {
    const matchedArray = searchData(this.value, games);
    console.log({matchedArray});
    let showData;
    if (inputText.value) {
        showData = matchedArray
        .slice(0, 5)
        .map(games => {
            return `
                <li class="display" data-index="${games.gameID}">
                    <a href="deal-page.html" class="linkLanding" data-index="${games.gameID}">
                        <span class="title" data-index="${games.gameID}">
                            <div class="imageDiv" data-index="${games.gameID}">
                                <img src="${games.thumb}" class="imgLanding" data-index="${games.gameID}">
                            </div>
                            <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                            <div class="priceDiv" data-index="${games.gameID}">
                                <span class="normalPrice" data-index="${games.gameID}">$${games.normalPrice}</span>
                                <span class="salePrice" data-index="${games.gameID}">$${games.salePrice}</span>
                            </div>
                        </span>
                    </a>
                </li>
            `   
        }).join('');
    } else {
        showData = matchedArray.slice(0, 0);
    }
    localStorage.setItem('mainSearchItems', JSON.stringify(matchedArray));
    list.innerHTML = showData;
}

function mapOnSale() {
    const filter = games.filter(game => game.isOnSale == 1);
    localStorage.setItem('mainSearchItems', JSON.stringify(filter));
    window.location = 'game-list.html';
}

function mapDealRating() {
    const filter = games.sort((firstGame, secondGame) => firstGame.dealRating - secondGame.dealRating);
    localStorage.setItem('mainSearchItems', JSON.stringify(filter));
    window.location = 'game-list.html';
}

function mapFreeGames() {
    const filter = games.filter(game => game.salePrice == 0);
    localStorage.setItem('mainSearchItems', JSON.stringify(filter));
    window.location = 'game-list.html';
    console.log(filter);
}

// submit form and load next page
function submitForm(e) {
    e.preventDefault();
    const inputValue = inputText.value;
    localStorage.setItem('searchValue', inputValue);
    window.location = 'game-list.html';
}

// select a specific game 
function gameInfo(e) {
    const gameId = e.target.dataset.index;
    localStorage.setItem('idToPass', gameId);
    window.location = 'deal-page.html';
}

// stops propagation and hides the list
function stopPropagation(e) {
    e.stopPropagation();
    list.classList.remove('hide');
}

inputText.addEventListener('keyup', displayData);
inputText.addEventListener('change', displayData);
inputText.addEventListener('mouseup', displayData);
form.addEventListener('submit', submitForm);
list.addEventListener('mouseup', gameInfo);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
saleList.addEventListener('mouseup', mapOnSale);
dealRatingList.addEventListener('mouseup', mapDealRating);
freeGameList.addEventListener('mouseup', mapFreeGames);
document.body.addEventListener('click', function removeList() {
    list.classList.add('hide');
});
localStorage.clear();

// should have a random game somwhere too
// add a transparent effect on the bottom
// add an error page when the search returns nothing, array.length = 0