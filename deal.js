const endpointToChange = 'https://www.cheapshark.com/api/1.0/games?id=612';
const gameId = localStorage.getItem('idToPass');
const dealsDiv = document.querySelector('.dealInfo');;
const endpoint = endpointToChange.replace(/[0-9]+$/, gameId);
console.log(gameId);

fetch(endpoint)
    .then(response => response.json())
    .then(data => getStuff(data))
    .catch((err) => console.warn(err))

function getStuff(data) {
    const games = [];
    games.push(data);
    console.log(games);
    dealsDiv.innerHTML = games.map(game => {
        return `
            <div>
                <div>${game.info.title}</div>
                <div>${game.cheapestPriceEver.price}</div>
                <div>${game.deals[0].price}</div>
            </div>
        `
    }).join('');
}

dealsDiv.addEventListener('onload', getStuff);

