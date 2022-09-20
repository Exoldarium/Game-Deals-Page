const endpoint = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';
const games = [];
const inputText = document.querySelector('.text');

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => games.push(...data))


function searchData(input, value) {
    return value.filter (game => {
        const regex = new RegExp (input, 'gi');
        return game.title.match(regex);
    });
}

function displayData() {
    const matchedArray = searchData(this.value, games);
    console.log(matchedArray);
}

inputText.addEventListener('keyup', displayData);
inputText.addEventListener('change', displayData);