const inputValue = localStorage.getItem('objectToPass');
const listValue = JSON.parse(localStorage.getItem('objectToTransfer'));
const inputGame = document.querySelector('.textGame');
const list = document.querySelector('.gameList');
// add local storage to new variable
const displayGames = inputValue;
// pass local storage as input
inputGame.value = displayGames;

function mapGames() {
    list.innerHTML = listValue.map(game => {
        return `
            <li class="list display">
                <span class="title">${game.title}</span>
            </li>
        `
    }).join('');
}
mapGames();

console.log(listValue);


