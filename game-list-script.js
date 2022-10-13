const endpoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const games = [];
const inputValue = localStorage.getItem('searchValue');
const listValue = JSON.parse(localStorage.getItem('mainSearchItems'));
const filteredValue = JSON.parse(localStorage.getItem('filteredItems'));
const inputGame = document.querySelector('.textGame');
const list = document.querySelector('.gameList');
const listSearch = document.querySelector('.listNav');
const form = document.querySelector('.listGameBar');
const range = document.querySelector('.rangeInput');
const rating = document.querySelector('.ratingRange');
const slider = document.querySelector('.sortSlider');
const labelRange = document.querySelector('.rangeLabel');
let listDiv = document.querySelector('.listGame');
// add local storage to new variable
const displayGames = inputValue;
// pass local storage as input
inputGame.value = displayGames;

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
    console.log(showData);
}

// display data in DOM based on parameters (page)
function mapGames() {   
    let showData;
    if (range.value) {
        showData = listValue
            .filter(games => games.salePrice <= range.value)
            .slice(0, 15)
            .map(games => {
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
        localStorage.setItem('mainSearchItems', JSON.stringify(listValue));
        list.innerHTML = showData;
    } 
    
    if (slider.value == 1) {
        showData = listValue
            .filter(games => games.salePrice <= range.value)
            .sort((firstGame, secondGame) => firstGame.salePrice - secondGame.salePrice)
            .slice(0, 15)
            .map(games => {
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
        localStorage.setItem('mainSearchItems', JSON.stringify(listValue));
        list.innerHTML = showData;
    }

    if (slider.value == 2) {
        showData = listValue
            .filter(games => games.salePrice <= range.value)
            .sort((firstGame, secondGame) => secondGame.salePrice - firstGame.salePrice)
            .slice(0, 15)
            .map(games => {
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
        localStorage.setItem('mainSearchItems', JSON.stringify(listValue));
        list.innerHTML = showData;
    }

    if (slider.value == 3) {
        showData = listValue
            .filter(games => games.salePrice <= range.value)
            .sort((firstGame, secondGame) => {
                if (firstGame.title < secondGame.title) 1;
                if(firstGame.title > secondGame.title)  -1;
                else 0;
            })
            .slice(0, 15)
            .map(games => {
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
        localStorage.setItem('mainSearchItems', JSON.stringify(listValue));
        list.innerHTML = showData;
    }

}

// submit the search bar form and go to specific game page
function gameInfo(e) {
    const gameId = e.target.dataset.index;
    localStorage.setItem('idToPass', gameId);
    window.location = 'deal-page.html';
    console.log(gameId);
}

// price range slider
function priceSort() {
    const rangeValue = range.value;
    const label = document.querySelector('.rangeLabel');
    label.textContent = 'Under $' + `${rangeValue}`;
    localStorage.setItem('rangeValue', rangeValue);
    console.log(range.value);
    mapGames();
}

// upper, lower, name range slider
function priceDescend() {
    const sliderValue = slider.value;    
    localStorage.setItem('sliderValue', sliderValue);
    mapGames();
}

// save the input value
function saveInputValue() {
    range.value = localStorage.getItem('rangeValue');
    slider.value = localStorage.getItem('sliderValue');
    labelRange.textContent = 'Under $' + `${range.value}`;
}

// stops propagation and hides the list
function stopPropagation(e) {
    e.stopPropagation();
    listSearch.classList.remove('hide');
}

// submit form and save form input value
function submitForm(e) {
    e.preventDefault();
    const valueInput = inputGame.value;
    localStorage.setItem('searchValue', valueInput);
    // localStorage.setItem('rangeValue', range.value);
    window.location = 'game-list.html';  
}

// display error if no results
// function displayError(e) {
    
// }

console.log({listValue});
inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('change', displayData);
inputGame.addEventListener('mouseup', displayData);
list.addEventListener('mouseup', gameInfo);
slider.addEventListener('change', priceDescend);
listSearch.addEventListener('mouseup', gameInfo);
range.addEventListener('change', priceSort);
window.addEventListener('change', saveInputValue);
window.addEventListener('load', saveInputValue);
window.addEventListener('load', mapGames);
form.addEventListener('submit', submitForm);
document.body.addEventListener('click', function removeList() {
    listSearch.classList.add('hide');
});
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);

// front page should have on sale link, aaa link and a random game link
// add an error page when the search returns nothing, array.length = 0
// play with callback functions see what works







