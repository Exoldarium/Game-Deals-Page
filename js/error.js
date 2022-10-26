const endpoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const games = [];
const randomGameList = document.querySelector('.randomGame');
const listGame = document.querySelector('.listGame');
const inputValue = localStorage.getItem('searchValue');
const listValue = JSON.parse(localStorage.getItem('mainSearchItems'));
const activeEffect = localStorage.getItem('activeEffect');
const inputGame = document.querySelector('.textGame');
const list = document.querySelector('.gameList');
const listSearch = document.querySelector('.listNav');
const form = document.querySelector('.listGameBar');
const logo = document.querySelectorAll('.logo');
const displayGames = inputValue;
inputGame.value = displayGames;
let showData;

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
    if (inputGame.value) {
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
    listSearch.innerHTML = showData;
}

// get a random game id
function mapRandomGame() {
    const gameIds = [];
    games.forEach((game) => {
        gameIds.push(game.gameID);
    })
    const randomLength = Math.floor(Math.random() * gameIds.length);
    const randomId = gameIds[randomLength];
    localStorage.setItem('idToPass', randomId);
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

inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('click', displayData);
listSearch.addEventListener('click', gameInfo);
listSearch.addEventListener('mouseover', gameInfo);
form.addEventListener('submit', submitForm);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
randomGameList.addEventListener('mouseover', mapRandomGame);
logo.forEach(logo => logo.addEventListener('click', () => window.location = 'index.html'));
document.body.addEventListener('click', () => listSearch.classList.add('hide'));