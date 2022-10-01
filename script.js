const endpoint = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=50';
const games = [];
const inputText = document.querySelector('.text');
const list = document.querySelector('.game');
const form = document.querySelector('.bar');
const landing = document.querySelector('.landing');

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

// display data in DOM
function displayData() {
    const matchedArray = searchData(this.value, games);
    console.log(matchedArray);
    let showData;
    if (inputText.value) {
        showData = matchedArray.slice(0, 5).map((games, i) => {
            return `
                <a href="game-list.html" class="linkLanding">
                    <li class="display" data-index="${games.gameID}">
                        <span class="title" data-index="${games.gameID}">${games.title}<img src="${games.thumb}" class="imgLanding" data-index="${games.gameID}"></img></span>
                        
                    </li>
                </a>
            `
        }).join('');
    } else {
        showData = matchedArray.slice(0, 0);
    }
    localStorage.setItem('objectToTransfer', JSON.stringify(matchedArray));
    list.innerHTML = showData;
    
}

// submit form and load next page
function submitForm(e) {
    e.preventDefault();
    const inputValue = inputText.value;
    localStorage.setItem('objectToPass', inputValue);
    window.location = 'game-list.html';
}

function gameInfo(e) {
    const gameId = e.target.dataset.index;
    localStorage.setItem('idToPass', gameId);
    window.location = 'deal-page.html';
}

inputText.addEventListener('keyup', displayData);
inputText.addEventListener('change', displayData);
inputText.addEventListener('mouseup', displayData);
form.addEventListener('submit', submitForm);
list.addEventListener('mouseup', gameInfo);

