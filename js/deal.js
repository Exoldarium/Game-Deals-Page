const endpointToChange = 'https://www.cheapshark.com/api/1.0/games?id=612';
const gamepoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const storepoint = 'https://www.cheapshark.com/api/1.0/stores';
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
const logo = document.querySelectorAll('.logo');
const displayGames = inputValue;
inputGame.value = displayGames;
let showData;

console.log(gameId);

// fetch the full game list 
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
                            <a href="https://www.cheapshark.com/redirect?dealID=${game.deals[0].dealID}">Check the Deal</a>
                        </span>
                    </div>
                    <div class="infoText">
                        Lowest price ever: $${game.cheapestPriceEver.price} on ${createDate(game.cheapestPriceEver.date)}
                    </div>
                </div>
            </div>
        `
    }).join('');
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

dealsDiv.addEventListener('load', getStuff);
inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('click', displayData);
listSearch.addEventListener('click', gameInfo);
listSearch.addEventListener('mouseover', gameInfo);
form.addEventListener('submit', submitForm);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
logo.forEach(logo => logo.addEventListener('click', () => window.location = 'index.html'));
document.body.addEventListener('click', () => listSearch.classList.add('hide'));

// 1 steam, 8 origin, 23 gamebillet, 11 humble, 30 indiegala, 3 greenman

