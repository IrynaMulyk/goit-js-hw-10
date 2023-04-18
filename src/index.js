import './css/styles.css';
import Notiflix from 'notiflix';
import CountriesApiService from './js/api';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const countriesApiService = new CountriesApiService();
input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  countriesApiService.country = e.target.value.trim();
  countriesApiService.fetchCountries().then(result => {
    if (result.length > 10) {
      clearMarkup();
      return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }
    appendCountryContent(result);
    if (result.status === 404) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
  });
}

const createCountryInfo = data =>
  data.reduce((acc, item) => {
    item.languages = Object.values(item.languages).join(', ');
    return (
      acc +
      `<div class="flag-country"><img src="${item.flags.png}" width=50 height=30></img>
        <p class="country-name">${item.name.official}</p></div>
        <p>Capital: <span>${item.capital}</span></p>
        <p>Population: <span>${item.population}</span></p>
        <p>Languages: <span>${item.languages}</span></p>`
    );
  }, '');

const createCountryList = data =>
  data.reduce((acc, item) => {
    return (
      acc +
      `<li><img src="${item.flags.png}" width=50 height=30></img>
    <p>${item.name.official}</p></li>`
    );
  }, '');

function appendCountryContent(data) {
  if (data.length <= 10 && data.length > 1) {
    clearMarkup();
    countryList.insertAdjacentHTML('beforeend', createCountryList(data));
  }
  if (data.length === 1) {
    clearMarkup();
    countryInfo.insertAdjacentHTML('beforeend', createCountryInfo(data));
  }
}
function clearMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
