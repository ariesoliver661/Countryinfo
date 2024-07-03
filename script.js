const input = document.getElementById('countryInput');
const countryData = document.getElementById('countryData');
const container = document.querySelector('.container');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function() {
    const searchQuery = input.value.trim();
    if (searchQuery !== '') {
        fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                countryData.innerHTML = '';
                data.forEach(country => {
                    const { name, capital, population, flags, region, subregion, languages, currencies } = country;
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <div>
                            <h2>${name.common}</h2>
                            <p><strong>Subregion:</strong> ${subregion}</p>
                            <p><strong>Capital:</strong> ${capital}</p>
                            <p><strong>Population:</strong> ${population.toLocaleString()}</p>
                            <p><strong>Region:</strong> ${region}</p>
                            <p><strong>Languages:</strong> ${Object.values(languages).join(', ')}</p>
                            <p><strong>Currencies:</strong> ${Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
                        </div>
                        <img src="${flags.png}" alt="${name.common} Flag" class="country-photo">
                    `;
                    countryData.appendChild(listItem);
                });
                container.style.overflowY = 'auto';
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        countryData.innerHTML = '';
        container.style.overflowY = 'hidden';
    }
});
