const endpointToChange = 'https://www.cheapshark.com/api/1.0/games?id=612';
const gameId = localStorage.getItem('idToPass');
const dealsDiv = document.querySelector('.dealInfo');
const regex = /[0-9]+$/;
const endpoint = endpointToChange.replace(regex, gameId);
console.log(gameId);

fetch(endpoint)
    .then(res => res.json())
    .then(data => getStuff(data))
    .catch((err) => console.warn(err))

// map the game info
function getStuff(data) {
    const games = [];
    games.push(data);
    console.log(games);
    dealsDiv.innerHTML = games.map(game => {
        return `
            <div class="dealsList">
                <div><img src="${game.info.thumb}"></img></div>
                <div>Title: ${game.info.title}</div>
                <div>Cheapest price ever: ${game.cheapestPriceEver.price}</div>
                <div>Deal: ${game.deals[0].price}</div>
            </div>
        `
    }).join('');
}

dealsDiv.addEventListener('onload', getStuff);

// 1 steam, 8 origin, 23 gamebillet, 11 humble, 30 indiegala, 3 greenman

