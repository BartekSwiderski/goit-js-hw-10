import './css/styles.css';
import debounce from '../node_modules/lodash/debounce';
import Notiflix from "../node_modules/notiflix";
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);
const countryList = qs(".country-list")
const countryInfo = qs(".country-info")
const form = qs("#search-box");
let markup = ""
const DEBOUNCE_DELAY = 300;
let arr = [];
function fetchUsers() {
  let countryName = form.value.trim();
  return fetch(`https://restcountries.com/v2/name/${countryName}?fields=name,capital,population,flag,languages`)
  .then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure("Oops, there is no country with that name");
    }
    return response.json();
  })
  .then(data => {
    arr=data
    return arr;
  })
  .catch(error => {
   });
}
form.addEventListener("input", debounce(
  () =>{
    fetchUsers()
      .then((users) => renderCountry(users))
      .catch((error) => console.log(error));}
  ,DEBOUNCE_DELAY))
function renderCountry(arr) {
  const divCounter= qsa(".add")
  for (let j = 0; j<divCounter.length; j++){ 
    const rem = qs(".add")
    rem.remove()}
  if (arr.length>10){Notiflix.Notify.info(`Too many matches (${arr.length}) found. Please enter a more specific name.`)};
  if (arr.status === 404){Notiflix.Notify.failure("Oops, there is no country with that name")}; 
  if (arr.length>1 && arr.length<=10){
      arr.forEach((countr) =>
      markup+=`<li class="add" style="display:flex; list-style: none;align-items: center">
      <img 
      src=${countr.flag}
      alt="flag"
      height="24"
      width="30"
      >
      <p style="padding-left:10px">${countr.name}</p></img>
        </li>`)
        countryList.insertAdjacentHTML("beforeend", markup);
        markup = ""
  }
  if (arr.length === 1){
   let lang=[...arr]
    .flatMap(country=>country.languages)
    .map(l=>l.name)
    .join(", ")
    console.log(arr)
   markup =`<ul class="add" style=" list-style: none;align-items: center">
              <div style="display:flex ;align-items: center"><img src=${arr[0].flag} alt="flag" height="40" width="50"><h2 style="padding-left:20px">${arr[0].name}</h2></img></div>
              <li style="display:flex;align-items: center"><b>Capital:</b><p style="padding-left:10px">${arr[0].capital}</p></li>
              <li style="display:flex;align-items: center"><b>Population:</b><p style="padding-left:10px">${arr[0].population}</p></li>
              <li style="display:flex;align-items: center"><b>Languages:</b><p style="padding-left:10px">${lang}</p></li>
          </ul>`;

     countryInfo.insertAdjacentHTML("beforeend", markup);
     markup = ""
}}