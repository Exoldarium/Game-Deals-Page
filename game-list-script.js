const endpoint = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';
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
    const showData = matchedArray.slice(0, 4).map((games, i) => {
        return `
            <a href="game-list.html" class="linkNav">
                <li class="navListDisplay">
                    <span class="navListTitle" data-index="${i}">${games.title}</span>
                </li>
            </a>
        `
    }).join(' ');
    
    localStorage.setItem('objectToTransfer', JSON.stringify(matchedArray));
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
            <a href="" class="linkList">
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

function listHover(e) {
    const span = e.target;
    console.log(span.dataset.index);
    if(e.target.matches('span')) {
        span.classList.add('hoverEffect');
    }
}

function listNoHover(e) {
    const span = e.target;
    if(e.target.matches('span')) {
        span.classList.remove('hoverEffect');
    }
}

mapGames();

console.log(listValue);
inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('change', displayData);
form.addEventListener('submit', submitForm);
listSearch.addEventListener('mouseup', submitForm);
listSearch.addEventListener('mouseover', listHover);
listSearch.addEventListener('mouseout', listNoHover);

