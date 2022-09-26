const endpoint = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';
const games = [];
const inputValue = localStorage.getItem('objectToPass');
const listValue = JSON.parse(localStorage.getItem('objectToTransfer'));
const inputGame = document.querySelector('.textGame');
const list = document.querySelector('.gameList');
const listSearch = document.querySelector('.listNav');
// add local storage to new variable
const displayGames = inputValue;
// pass local storage as input
inputGame.value = displayGames;

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => games.push(...data))

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
    const showData = matchedArray.slice(0, 4).map(games => {
        return `
            <li class="navListDisplay">
                <span class="navListTitle">${games.title}</span>
            </li>
        `
    }).join(' ');
    
    listSearch.innerHTML = showData;
    
    if (inputGame.value === '') {
        listSearch.classList.add('opacityList');
    } else {
        listSearch.classList.remove('opacityList');
    }
}

// display data in DOM
function mapGames() {
    list.innerHTML = listValue.slice(0, 15).map(game => {
        return `
            <li class="gameDisplay">
                <span class="gameTitle">${game.title}</span>
            </li>
        `
    }).join('');
}
mapGames();

console.log(listValue);
inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('change', displayData);


