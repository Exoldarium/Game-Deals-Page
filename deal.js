const endpoint = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=50';
const gamepoint = 'https://www.cheapshark.com/api/1.0/games?id=612';
const games = [];
const dealsDiv = document.querySelector('.dealInfo');

// https://stackoverflow.com/questions/57102841/vanilla-javascript-change-api-endpoint-based-on-option-value
// save the object that was clicked into local storage, send it to the new page and access its id, put that id into the api url and then fetch the new url and manipulate data
// Promise.all([
//     fetch(endpoint),
//     fetch(gamepoint)
//   ]).then(blobs =>
//     Promise.all(blobs.map(blob => blob.json()))
//   ).then(data =>
//     games.push(...data)
//   ).catch(err =>
//     console.log(err)
//   );
//   console.log(games);

// function displayData() {
//     dealsDiv.innerHTML = games.map(game => {
//         return `
//             <li>
//                 <span>${game.thumb}</span>
//             </li>
//         `
//     }).join('');
// }

// displayData();
