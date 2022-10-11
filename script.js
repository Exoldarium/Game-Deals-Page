const endpoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
const games = [];
const inputText = document.querySelector('.text');
const list = document.querySelector('.game');
const form = document.querySelector('.bar');
const landing = document.querySelector('.landing');

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
    console.log(matchedArray);
    let showData;
    if (inputText.value) {
        showData = matchedArray.slice(0, 5).map(games => {
            return `
                <li class="display" data-index="${games.gameID}">
                    <a href="deal-page.html" class="linkLanding" data-index="${games.gameID}">
                        <span class="title" data-index="${games.gameID}">
                            <div class="imageDiv" data-index="${games.gameID}">
                                <img src="${games.thumb}" class="imgLanding" data-index="${games.gameID}"></img>
                            </div>
                            <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                            <span class="priceSpan" data-index="${games.gameID}">$${games.salePrice}</span>
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

// submit form and load next page
function submitForm(e) {
    e.preventDefault();
    const inputValue = inputText.value;
    localStorage.setItem('searchValue', inputValue);
    window.location = 'game-list.html';
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
form.addEventListener('submit', submitForm);
list.addEventListener('mouseup', gameInfo);
form.addEventListener('click', stopPropagation);
form.addEventListener('keyup', stopPropagation);
document.body.addEventListener('click', function removeList() {
    list.classList.add('hide');
});
