const endpointToChange = 'https://www.cheapshark.com/api/1.0/games?id=612';
const gamepoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const gameId = localStorage.getItem('idToPass');
const inputValue = localStorage.getItem('searchValue');
const listValue = JSON.parse(localStorage.getItem('mainSearchItems'));
const regex = /[0-9]+$/;
const endpoint = endpointToChange.replace(regex, gameId);
const games = [];
const dealsDiv = document.querySelector('.dealInfo');
const listSearch = document.querySelector('.listNav');
const inputGame = document.querySelector('.textGame');
const form = document.querySelector('.listGameBar');
const displayGames = inputValue;
inputGame.value = displayGames;

console.log(gameId);

// fetc the full game list 
fetch(gamepoint)
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
    localStorage.setItem('mainSearchItems', JSON.stringify(matchedArray));
    listSearch.innerHTML = showData;
}

// fetch the specific game
fetch(endpoint)
    .then(res => res.json())
    .then(data => getStuff(data))
    .catch((err) => console.warn(err))

// map the specific game info
function getStuff(data) {
    const games = [];
    games.push(data);
    console.log(games);
    dealsDiv.innerHTML = games.map(game => {
        return `
            <div class="dealsList">
                <div><img src="${game.info.thumb}"></img></div>
                <div>Title: ${game.info.title}</div>
                <div>Cheapest price ever: ${game.cheapestPriceEver.price}</div>
                <div>Deal: ${game.deals[0].price}</div>
            </div>
        `
    }).join('');
}

// submit search bar form and load results
function submitForm(e) {
    e.preventDefault();
    const valueInput = inputGame.value;
    localStorage.setItem('searchValue', valueInput);
    window.location = 'game-list.html';
}

// submit the search bar form and go to specific game page
function gameInfo(e) {
    const gameId = e.target.dataset.index;
    localStorage.setItem('idToPass', gameId);
    window.location = 'deal-page.html';
    console.log(gameId);
}

dealsDiv.addEventListener('onload', getStuff);
inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('change', displayData);
inputGame.addEventListener('mouseup', displayData);
form.addEventListener('submit', submitForm);
listSearch.addEventListener('mouseup', gameInfo);

// 1 steam, 8 origin, 23 gamebillet, 11 humble, 30 indiegala, 3 greenman

