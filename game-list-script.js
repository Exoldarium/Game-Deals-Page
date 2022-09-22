const endpoint = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';
const games = [];
const inputValue = localStorage.getItem('objectToPass');
const inputGame = document.querySelector('.textGame');
const form = document.querySelector('.listGameBar');
const list = document.querySelector('.gameList');
const displayGames = inputValue;
inputGame.value = displayGames;
console.log(displayGames);
// alert('Inserted Data' + inputValue);
// localStorage.removeItem('objectToPass');

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => games.push(...data))


function searchData(input, value) {
    return value.filter(game => {
        const regex = new RegExp (input, 'gi');
        return game.title.match(regex);
    });
}

function displayData() {
    const matchedArray = searchData(this.value, games);
    const showData = matchedArray.slice(0, 5).map(games => {
        return `
            <li class="list display">
                <span class="title">${games.title}</span>
            </li>
        `
    }).join(' ');
    
    list.innerHTML = showData;
    
}

inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('change', displayData);