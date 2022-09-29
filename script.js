const endpoint = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';
const games = [];
const inputText = document.querySelector('.text');
const list = document.querySelector('.game');
const form = document.querySelector('.bar');

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
    const showData = matchedArray.slice(0, 5).map(games => {
        return `
            <a href="game-list.html" class="linkLanding">
                <li class="display">
                    <span class="title">${games.title}</span>
                    <img src="${games.thumb}" class="imgLanding"></img>
                </li>
            </a>
        `
    }).join(' ');
    
    localStorage.setItem('objectToTransfer', JSON.stringify(matchedArray));
    list.innerHTML = showData;
    
    if (inputText.value === '') {
        list.classList.add('opacityList');
    } else {
        list.classList.remove('opacityList');
    }
}

// submit form and load next page
function submitForm(e) {
    e.preventDefault();
    const inputValue = inputText.value;
    localStorage.setItem('objectToPass', inputValue);
    window.location = 'game-list.html';
    console.log(e);
}

// function listHover(e) {
//     const span = e.target;
//     console.log(span.dataset.index);
//     if(e.target.matches('span')) {
//         span.classList.add('hoverEffect');
//     }
// }

// function listNoHover(e) {
//     const span = e.target;
//     if(e.target.matches('span')) {
//         span.classList.remove('hoverEffect');
//     }
// }

inputText.addEventListener('keyup', displayData);
inputText.addEventListener('change', displayData);
form.addEventListener('submit', submitForm);
list.addEventListener('mouseup', submitForm);

