const inputValue = localStorage.getItem('objectToPass');
const listValue = JSON.parse(localStorage.getItem('objectToTransfer'));
const inputGame = document.querySelector('.textGame');
const list = document.querySelector('.gameList');
// add local storage to new variable
const displayGames = inputValue;
// pass local storage as input
inputGame.value = displayGames;

function mapGames() {
    list.innerHTML = listValue.splice(0, 15).map(game => {
        return `
            <li class="gameDisplay">
                <span class="gameTitle">${game.title}</span>
            </li>
        `
    }).join('');
}
mapGames();

console.log(listValue);


