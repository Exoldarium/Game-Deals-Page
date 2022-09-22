const endpoint = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';
const games = [];
const inputText = document.querySelector('.text');
const list = document.querySelector('.game');
const form = document.querySelector('.bar');

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
    const showData = matchedArray.slice(0, 4).map(games => {
        return `
            <li class="list display">
                <span class="title">${games.title}</span>
            </li>
        `
    }).join(' ');
    
    list.innerHTML = showData;
    
    if (inputText.value === '') {
        list.classList.add('opacityList');
    } else {
        list.classList.remove('opacityList');
    }

}

function submitForm(e) {
    e.preventDefault();
    const inputValue = inputText.value;
    localStorage.setItem('objectToPass', inputValue);
    window.location = 'game-list.html';
}

inputText.addEventListener('keyup', displayData);
inputText.addEventListener('change', displayData);
form.addEventListener('submit', submitForm);
