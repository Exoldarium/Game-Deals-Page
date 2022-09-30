const endpoint = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';
const games = [];
const inputText = document.querySelector('.text');
const list = document.querySelector('.game');
const form = document.querySelector('.bar');
const landing = document.querySelector('.landing');
let color;

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

// display data in DOM
function displayData() {
    const matchedArray = searchData(this.value, games);
    let showData;
    if (inputText.value) {
        showData = matchedArray.slice(0, 5).map((games, i) => {
            return `
                <a href="game-list.html" class="linkLanding">
                    <li class="display" data-index="${i}">
                        <span class="title" data-index="${i}">${games.title}<img src="${games.thumb}" class="imgLanding"></img></span>
                        
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

inputText.addEventListener('keyup', displayData);
inputText.addEventListener('change', displayData);
inputText.addEventListener('mouseup', displayData);
form.addEventListener('submit', submitForm);
list.addEventListener('mouseup', submitForm);

