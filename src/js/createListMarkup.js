export default function createListMarkup (countries) {
    return countries.map(country => {
        return `<li>    
        <p><img src="${country.flags.svg}" width="30px"> ${country.name.common}</p>
         </li>`
    }).join("");
};