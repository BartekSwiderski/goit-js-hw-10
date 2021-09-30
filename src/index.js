import './css/styles.css';
import debounce from '../node_modules/lodash/debounce';
import Notiflix from "../node_modules/notiflix";
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);
const countryList = qs(".country-list")
const form = qs("#search-box");
let del = qsa(".add");
let markup = ""
const DEBOUNCE_DELAY = 300;
let arr = [];
function fetchUsers() {
  let countryName = form.value.trim();
  return fetch(`https://restcountries.com/v2/name/${countryName}?fields=name,capital,population,flag,languages`)
  .then(response => {
    console.log(response)
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
  () => {del.forEach((it)=>it.remove());
    fetchUsers()
      .then((users) => renderCountry(users))
      .catch((error) => console.log(error));
  }
  ,DEBOUNCE_DELAY))

function renderCountry(arr) {
  console.log(arr)
  if (arr.length>10){Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")};
  if (arr.length === 0){Notiflix.Notify.failure("Oops, there is no country with that name")}; 
  if (arr.length>1 && arr.length<=10){
    let flag = arr.map(coun => coun.flag)
    let name = arr.map(coun => coun.name)
    for( let i =0; i<arr.length; i++){
      markup+=`<li class="add">
      <img 
      src=${flag[i]}
      alt="flag"
      width="50"
      >
      <p>${name[i]}</p></img>
        </li>`}
        countryList.insertAdjacentHTML("beforeend", markup);
        markup  = "";
}}
