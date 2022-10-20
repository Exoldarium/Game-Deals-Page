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
    window.location = 'deal-page.html';
    console.log(gameId);
}

// stops propagation and hides the list
function stopPropagation(e) {
    e.stopPropagation();
    listSearch.classList.remove('hide');
}

inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('change', displayData);
inputGame.addEventListener('mouseup', displayData);
listSearch.addEventListener('mouseup', gameInfo);
form.addEventListener('submit', submitForm);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
randomGameList.addEventListener('mouseenter', mapRandomGame);
logo.forEach(logo => logo.addEventListener('mouseup', () => window.location = 'index.html'));
document.body.addEventListener('click', () => listSearch.classList.add('hide'));