const endpoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const games = [];
const inputValue = localStorage.getItem('searchValue');
const listValue = JSON.parse(localStorage.getItem('mainSearchItems'));
const activeEffect = localStorage.getItem('activeEffect');
const inputGame = document.querySelector('.textGame');
const list = document.querySelector('.gameList');
const listSearch = document.querySelector('.listNav');
const form = document.querySelector('.listGameBar');
const range = document.querySelector('.rangeInput');
const rating = document.querySelector('.ratingRange');
const slider = document.querySelector('.sortSlider');
const labelRange = document.querySelector('.rangeLabel');
const spans = document.querySelectorAll('.spans');
const logo = document.querySelectorAll('.logo');
const submitButton = document.querySelector('.submit');
const logoImg = document.querySelector('.logoIMG');
// add local storage to new variable
const displayGames = inputValue;
// pass local storage as input
inputGame.value = displayGames;
let showData;

// fetch the endpoint
fetch(endpoint)
    .then(res => res.json())
    .then(data => games.push(...data))
    .catch((err) => console.warn(err))

// match user input with game.title property
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
    listSearch.innerHTML = showData;
}

// display data in DOM based on parameters (page)
function mapGames() {   
    let showData;
    // set to 3 (half of range slider) so that the first load displays unfiltered list
    if (slider.value == 3) {
        showData = listValue
            .filter(games => games.salePrice <= range.value)
            // .slice(0, 15)
            .map(games => {
                return `
                    <li class="gameDisplay" data-index="${games.gameID}">
                        <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                            <span class="gameTitle" data-index="${games.gameID}">
                                <div class="imageDiv" data-index="${games.gameID}">
                                    <img src="${games.thumb}" class="imgList" data-index="${games.gameID}">
                                </div>
                                <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                            </span>
                            <div class="priceDiv" data-index="${games.gameID}">
                                <span class="normalPrice" data-index="${games.gameID}">$${games.normalPrice}</span>
                                <span class="salePrice" data-index="${games.gameID}">$${games.salePrice}</span>
                            </div>
                            <div class="discount" data-index="${games.gameID}">
                                <span class="discountSpan" data-index="${games.gameID}">-${Math.round(games.savings)}%</span>
                            </div>
                        </a>
                    </li>
                `
            }).join('');
        localStorage.setItem('mainSearchItems', JSON.stringify(listValue));
        list.innerHTML = showData;
    }

    // sort based on price (lower)
    if (slider.value == 1) {
        showData = listValue
            .filter(games => games.salePrice <= range.value)
            .sort((firstGame, secondGame) => firstGame.salePrice - secondGame.salePrice)
            // .slice(0, 15)
            .map(games => {
                return `
                    <li class="gameDisplay" data-index="${games.gameID}">
                        <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                            <span class="gameTitle" data-index="${games.gameID}">
                                <div class="imageDiv" data-index="${games.gameID}">
                                    <img src="${games.thumb}" class="imgList" data-index="${games.gameID}">
                                </div>
                                <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                            </span>
                            <div class="priceDiv" data-index="${games.gameID}">
                                <span class="normalPrice" data-index="${games.gameID}">$${games.normalPrice}</span>
                                <span class="salePrice" data-index="${games.gameID}">$${games.salePrice}</span>
                            </div>
                            <div class="discount" data-index="${games.gameID}">
                                <span class="discountSpan" data-index="${games.gameID}">-${Math.round(games.savings)}%</span>
                            </div>
                        </a>
                    </li>
                `
            }).join('');
        localStorage.setItem('mainSearchItems', JSON.stringify(listValue));
        list.innerHTML = showData;
    }
    // sort based on price (higher)
    if (slider.value == 2) {
        showData = listValue
            .filter(games => games.salePrice <= range.value)
            .sort((firstGame, secondGame) => secondGame.salePrice - firstGame.salePrice)
            // .slice(0, 15)
            .map(games => {
                return `
                    <li class="gameDisplay" data-index="${games.gameID}">
                        <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                            <span class="gameTitle" data-index="${games.gameID}">
                                <div class="imageDiv" data-index="${games.gameID}">
                                    <img src="${games.thumb}" class="imgList" data-index="${games.gameID}">
                                </div>
                                <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                            </span>
                            <div class="priceDiv" data-index="${games.gameID}">
                                <span class="normalPrice" data-index="${games.gameID}">$${games.normalPrice}</span>
                                <span class="salePrice" data-index="${games.gameID}">$${games.salePrice}</span>
                            </div>
                            <div class="discount" data-index="${games.gameID}">
                                <span class="discountSpan" data-index="${games.gameID}">-${Math.round(games.savings)}%</span>
                            </div>
                        </a>
                    </li>
                `
            }).join('');
        localStorage.setItem('mainSearchItems', JSON.stringify(listValue));
        list.innerHTML = showData;
    }

    // sort based on name
    if (slider.value == 4) {
        showData = listValue
            .filter(games => games.salePrice <= range.value)
            .sort((firstGame, secondGame) => {
                if (firstGame.internalName < secondGame.internalName) { return -1; }
                if(firstGame.internalName > secondGame.internalName)  { return 1; }
                else return 0; 
            })
            // .slice(0, 15)
            .map(games => {
                return `
                    <li class="gameDisplay" data-index="${games.gameID}">
                        <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                            <span class="gameTitle" data-index="${games.gameID}">
                                <div class="imageDiv" data-index="${games.gameID}">
                                    <img src="${games.thumb}" class="imgList" data-index="${games.gameID}">
                                </div>
                                <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                            </span>
                            <div class="priceDiv" data-index="${games.gameID}">
                                <span class="normalPrice" data-index="${games.gameID}">$${games.normalPrice}</span>
                                <span class="salePrice" data-index="${games.gameID}">$${games.salePrice}</span>
                            </div>
                            <div class="discount" data-index="${games.gameID}">
                                <span class="discountSpan" data-index="${games.gameID}">-${Math.round(games.savings)}%</span>
                            </div>
                        </a>
                    </li>
                `
            }).join('');
        localStorage.setItem('mainSearchItems', JSON.stringify(listValue));
        list.innerHTML = showData;
    }

    // sort based on discount (savings)
    if (slider.value == 5) {
        showData = listValue
            .filter(games => games.salePrice <= range.value)
            .sort((firstGame, secondGame) => secondGame.savings - firstGame.savings)
            // .slice(0, 15)
            .map(games => {
                return `
                    <li class="gameDisplay" data-index="${games.gameID}">
                        <a href="deal-page.html" class="linkList" data-index="${games.gameID}">
                            <span class="gameTitle" data-index="${games.gameID}">
                                <div class="imageDiv" data-index="${games.gameID}">
                                    <img src="${games.thumb}" class="imgList" data-index="${games.gameID}">
                                </div>
                                <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                            </span>
                            <div class="priceDiv" data-index="${games.gameID}">
                                <span class="normalPrice" data-index="${games.gameID}">$${games.normalPrice}</span>
                                <span class="salePrice" data-index="${games.gameID}">$${games.salePrice}</span>
                            </div>
                            <div class="discount" data-index="${games.gameID}">
                                <span class="discountSpan" data-index="${games.gameID}">-${Math.round(games.savings)}%</span>
                            </div>
                        </a>
                    </li>
                `
            }).join('');
        localStorage.setItem('mainSearchItems', JSON.stringify(listValue));
        list.innerHTML = showData;
    }
}

// submit the search bar form and go to specific game page that user clicked on, store gameId in localStorage
function gameInfo(e) {
    const gameId = e.target.dataset.index;
    localStorage.setItem('idToPass', gameId);
}

// price range slider value and label value, store them in localStorage
function priceRange() {
    const rangeValue = range.value;
    const label = document.querySelector('.rangeLabel');
    label.textContent = 'Under $' + `${rangeValue}`;
    localStorage.setItem('rangeValue', rangeValue);
    mapGames();
}

// upper, lower, name range slider values, store them in localStorage
function parameterSort() {
    const sliderValue = slider.value;    
    localStorage.setItem('sliderValue', sliderValue);
    mapGames();
}

// save the input value and load activeEffect from localStorage so that the active effect persists
function saveInputValue() {
    range.value = localStorage.getItem('rangeValue');
    slider.value = localStorage.getItem('sliderValue');
    labelRange.textContent = 'Under $' + `${range.value}`;
    for (let index = 0; index < spans.length; index++) {
        if (spans[0].dataset.active == activeEffect) {
            spans[0].classList.add('activeEffect');
        }
        if (spans[1].dataset.active == activeEffect) {
            spans[1].classList.add('activeEffect');
        }
        if (spans[2].dataset.active == activeEffect) {
            spans[2].classList.add('activeEffect');
        } 
        if (spans[3].dataset.active == activeEffect) {
            spans[3].classList.add('activeEffect');
        } 
    }
}

// stops propagation and hides the list in the search bar
function stopPropagation(e) {
    e.stopPropagation();
    listSearch.classList.remove('hide');
}

// submit form and save form input value in localStorage, if the list gives no results go to error page
function submitForm(e) {
    e.preventDefault();
    const valueInput = inputGame.value;
    localStorage.setItem('searchValue', valueInput);
    if (valueInput == 0) {
        window.location = 'error-page.html';
    } else {
        window.location = 'game-list.html';
    }
}

// set active effect for each of the buttons, using data-index to recognize which input was clicked
function setActive(e) {
    const target = e.target;
    const targetElement = target.dataset.active;
    localStorage.setItem('activeEffect', targetElement);
    spans.forEach(span => {
        span.classList.remove('activeEffect');
    })
    target.classList.add('activeEffect');
    if (targetElement == '0') {
        slider.value = 1;
    }
    if (targetElement == '1') {
        slider.value = 2;
    }
    if (targetElement == '2') {
        slider.value = 4;
    }
    if (targetElement == '3') {
        slider.value = 5;
    }
    localStorage.setItem('sliderValue', slider.value);
    mapGames();
}

// change logo image on mobile
function removeActiveList() {
    if (screen.width < 760) {
        logoImg.src = 'images/titleLogo.png';
    }
}

inputGame.addEventListener('keyup', displayData);
inputGame.addEventListener('click', displayData);
list.addEventListener('mouseover', gameInfo);
list.addEventListener('click', gameInfo);
slider.addEventListener('change', parameterSort);
listSearch.addEventListener('click', gameInfo);
listSearch.addEventListener('mouseover', gameInfo);
range.addEventListener('change', priceRange);
form.addEventListener('submit', submitForm);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
spans.forEach(span => span.addEventListener('click', setActive));
submitButton.addEventListener('click', submitForm);
window.addEventListener('load', saveInputValue);
window.addEventListener('load', mapGames);
window.addEventListener('load', removeActiveList);
logo.forEach(logo => logo.addEventListener('click', () => window.location = 'index.html'));
document.body.addEventListener('click', () => listSearch.classList.add('hide'));






