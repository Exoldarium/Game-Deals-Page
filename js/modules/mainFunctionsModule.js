const endpoint = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=50';
export const games = [];
const inputText = document.querySelector('.textGame');
const listSearch = document.querySelector('.listNav');
const logoImg = document.querySelector('.logoIMG');
let showData;

// fetch the endpoint
fetch(endpoint)
  .then(res => res.json())
  .then(data => games.push(...data))
  .catch((err) => console.warn(err))

// match input with game.title property
function searchData(input, value) {
  return value.filter(game => {
    const regex = new RegExp(input, 'gi');
    return game.title.match(regex);
  });
}

// display data in DOM, search bar
export function displayData() {
  const matchedArray = searchData(this.value, games);
  if (inputText.value) {
    showData = matchedArray
      .slice(0, 5)
      .map(games => {
        return `
          <li class="display" data-index="${games.gameID}">
            <a href="deal-page.html" class="linkLanding" data-index="${games.gameID}">
              <span class="title" data-index="${games.gameID}">
                <div class="imageDiv" data-index="${games.gameID}">
                  <img src="${games.thumb}" class="imgLanding" data-index="${games.gameID}">
                </div>
                <span class="spaceSpan" data-index="${games.gameID}">${games.title}</span>
                  <div class="priceDiv" data-index="${games.gameID}">
                    <span class="normalPrice" data-index="${games.gameID}">$${games.normalPrice}</span>
                    <span class="salePrice" data-index="${games.gameID}">$${games.salePrice}</span>
                  </div>
                </span>
            </a>
          </li>
        `
    }).join('');
  } else {
    showData = matchedArray.slice(0, 0);
  }
  localStorage.setItem('mainSearchItems', JSON.stringify(matchedArray));
  listSearch.innerHTML = showData;
}

// get all game ids, push them into array, and select a random one to store in localStorage
export function mapRandomGame() {
  const gameIds = [];
  games.forEach((game) => {
    gameIds.push(game.gameID);
  })
  const randomLength = Math.floor(Math.random() * gameIds.length);
  const randomId = gameIds[randomLength];
  localStorage.setItem('idToPass', randomId);
  console.log(randomId);
}

// submit the search bar form and go to specific game page that user clicked on, store gameId in localStorage
export function gameInfo(e) {
  const gameId = e.target.dataset.index;
  localStorage.setItem('idToPass', gameId);
}

// stops propagation and hides the list
export function stopPropagation(e) {
  e.stopPropagation();
  listSearch.classList.remove('hide');
}

// change logo image on mobile
export function removeActiveList() {
  if (screen.width < 760) {
    logoImg.src = 'images/titleLogo.png';
  }
}
