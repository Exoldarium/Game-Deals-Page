const endpoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const games = [];
const gameIds = [];
const inputText = document.querySelector('.text');
const list = document.querySelector('.game');
const form = document.querySelector('.bar');
const landing = document.querySelector('.formWrap');
const offers = document.querySelectorAll('.imgSale');
const randomGameList = document.querySelector('.randomGame');
const logo = document.querySelectorAll('.logo');
const submitButton = document.querySelector('.submit');
const logoImg = document.querySelector('.logoIMG');
let showData;

// fetch the endpoint
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

// display data in DOM, search bar
function displayData() {
    const matchedArray = searchData(this.value, games);
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
    // depending which element user clicks
    const targetIndex = e.target.dataset.index;
    // filter games that are on sale
    if (targetIndex == 0) {
        const filter = games.filter(game => game.isOnSale);
        localStorage.setItem('mainSearchItems', JSON.stringify(filter));
    }
    // sort games based on dealRating property
    if (targetIndex == 1) {
        const filter = games.sort((firstGame, secondGame) => firstGame.dealRating - secondGame.dealRating);
        localStorage.setItem('mainSearchItems', JSON.stringify(filter));
    }
    // filter games that are free, price == 0
    if (targetIndex == 2) {
        const filter = games.filter(game => game.salePrice == 0);
        localStorage.setItem('mainSearchItems', JSON.stringify(filter));
    }
}

// get all game ids, push them into array, and select a random one to store in localStorage
function mapRandomGame() {
    const gameIds = [];
    games.forEach((game) => {
        gameIds.push(game.gameID);
    })
    const randomLength = Math.floor(Math.random() * gameIds.length);
    const randomId = gameIds[randomLength];
    localStorage.setItem('idToPass', randomId);
  
}

// submit form and load next page, if the search gives no results load error page
function submitForm(e) {
    e.preventDefault();
    const inputValue = inputText.value;
    localStorage.setItem('searchValue', inputValue);
    window.location = 'game-list.html';
    if (showData.length == 0) {
        window.location = 'error-page.html';
    }
}

// select a specific game that user clicked or mouseovered on and add to localStorage
function gameInfo(e) {
    const gameId = e.target.dataset.index;
    localStorage.setItem('idToPass', gameId);
}

// stops propagation and hides the list
function stopPropagation(e) {
    e.stopPropagation();
    list.classList.remove('hide');
}

// change logo image on mobile
function removeActiveList() {
    if (screen.width < 760) {
        logoImg.src = 'images/titleLogo.png';
    }
}

inputText.addEventListener('keyup', displayData);
inputText.addEventListener('click', displayData);
list.addEventListener('mouseover', gameInfo);
list.addEventListener('click', gameInfo);
form.addEventListener('submit', submitForm);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
offers.forEach(offer => offer.addEventListener('click', mapCategory));
offers.forEach(offer => offer.addEventListener('mouseover', mapCategory));
randomGameList.addEventListener('mouseover', mapRandomGame);
submitButton.addEventListener('click', submitForm);
window.addEventListener('load', removeActiveList);
logo.forEach(logo => logo.addEventListener('click', () => window.location = 'index.html'));
document.body.addEventListener('click', () => list.classList.add('hide'));
localStorage.clear();