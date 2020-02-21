// includes city name, state name, population, etc
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// cities container
const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data)); // spread data and push to array

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // figure out if the city or state name matches what was searched
        const regex = new RegExp(wordToMatch, 'gi'); // g:global, i:ignore lower/upperletter
        return place.city.match(regex) || place.state.match(regex);
    });
}

// add comma to the number like xxx,xxx
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// display input
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        // highlight at where matches regex
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join(''); // from Array with multiple items into one single String
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);