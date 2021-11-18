import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import {fetchCountries} from "./js/fetchCountries.js"

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    info: document.querySelector(".country-info"),
};

refs.input.addEventListener("input", debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries (e) {
    fetchCountries(e.target.value.trim()).then(data => {
        if (data.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (data.length >= 2 && data.length <= 10) {
            createListMarkup(data);
        }  else {
            createInfoMarkup(data);
        }
    }).catch((error) => Notify.failure("Oops, there is no country with that name"));
};

function createListMarkup (countries) {
    const markup = countries.map(country => {
        return `<li>
        <img src="${country.flags.svg}" width="30px">
        <p>${country.name.official}</p>
         </li>`
    }).join("");

    refs.list.innerHTML = markup;
    refs.info.innerHTML = "";
};

function createInfoMarkup (countries) {
    const markup = countries.map(country => {
        return `<img src="${country.flags.svg}" width="30px">
        <h1>${country.name.official}</h1>
        <ul>
          <li>Capital: ${country.capital}</li>
          <li>Population: ${country.population}</li>
          <li>Languages: ${Object.values(country.languages)}</li>
        </ul>`
    }).join("");

    refs.info.innerHTML = markup;
    refs.list.innerHTML = "";
};