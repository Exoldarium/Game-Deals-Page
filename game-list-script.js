const endpoint = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=50';
const games = [];
const inputValue = localStorage.getItem('objectToPass');
const listValue = JSON.parse(localStorage.getItem('objectToTransfer'));
const inputGame = document.querySelector('.textGame');
const list = document.querySelector('.gameList');
const listSearch = document.querySelector('.listNav');
const form = document.querySelector('.listGameBar');
// add local storage to new variable
const displayGames = inputValue;
// pass local storage as input
inputGame.value = displayGames;

fetch(endpoint)
    .then(blob => blob.json())
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
        showData = matchedArray.slice(0, 5).map((games, i) => {
            return `
                <a href="game-list.html" class="linkNav">
                    <li class="navListDisplay">
                        <span lass="navListTitle" data-index="${i}">${games.title}</span>
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
    list.innerHTML = listValue.slice(0, 15).map(game => {
        return `
            <a href="https://www.cheapshark.com/#deal:${game.dealID}" class="linkList">
                <li class="gameDisplay">
                    <span class="gameTitle">${game.title}</span>
                    <img src="${game.thumb}" class="imgList"></img>
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

mapGames();

console.log(listValue);
inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('change', displayData);
inputGame.addEventListener('mousedown', displayData);
form.addEventListener('submit', submitForm);
listSearch.addEventListener('mouseup', submitForm);


