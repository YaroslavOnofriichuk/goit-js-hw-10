  export default function createInfoMarkup (countries) {
        return countries.map(country => {
          return `
            <h1><img src="${country.flags.svg}" width="50px"> ${country.name.official}</h1>
            <ul>
              <li>Capital: ${country.capital}</li>
              <li>Population: ${country.population}</li>
              <li>Languages: ${Object.values(country.languages)}</li>
            </ul>`
        }).join("");
    };