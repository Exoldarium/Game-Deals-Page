const endpoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const games = [];
const gameIds = [];
const inputText = document.querySelector('.text');
const list = document.querySelector('.game');
const form = document.querySelector('.bar');
const landing = document.querySelector('.formWrap');
const offers = document.querySelectorAll('.offers');
const randomGameList = document.querySelector('.randomGame');
const logo = document.querySelectorAll('.logo');
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

// display data in DOM
function displayData() {
    const matchedArray = searchData(this.value, games);
    console.log({matchedArray});
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

// sort based on the parameters and load next page
function mapCategory(e) {
    const targetIndex = e.target.dataset.index;
    if (targetIndex == 0) {
        const filter = games.filter(game => game.isOnSale == 1);
        localStorage.setItem('mainSearchItems', JSON.stringify(filter));
        window.location = 'game-list.html';
    }

    if (targetIndex == 1) {
        const filter = games.sort((firstGame, secondGame) => firstGame.dealRating - secondGame.dealRating);
        localStorage.setItem('mainSearchItems', JSON.stringify(filter));
        window.location = 'game-list.html';
    }
    
    if (targetIndex == 2) {
        const filter = games.filter(game => game.salePrice == 0);
        localStorage.setItem('mainSearchItems', JSON.stringify(filter));
        window.location = 'game-list.html';
    }
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
    window.location = 'deal-page.html';
}

// submit form and load next page
function submitForm(e) {
    e.preventDefault();
    const inputValue = inputText.value;
    localStorage.setItem('searchValue', inputValue);
    window.location = 'game-list.html';
    if (showData.length == 0) {
        window.location = 'error-page.html';
    }
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
list.addEventListener('mouseup', gameInfo);
form.addEventListener('submit', submitForm);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
offers.forEach(offer => offer.addEventListener('mouseup', mapCategory));
randomGameList.addEventListener('mouseup', mapRandomGame);
logo.forEach(logo => logo.addEventListener('mouseup', () => window.location = 'index.html'));
document.body.addEventListener('click', () => list.classList.add('hide'));
localStorage.clear();
