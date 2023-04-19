import Notiflix from 'notiflix';
export default class CountriesApiService {
  constructor() {
    this.countryName = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this.countryName}?fields=name,capital,population,flags,languages`;
    if (this.country === '' || this.country === ' ') {
      Notiflix.Notify.info('Please fill out the field');
    } else {
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          return data;
        });
    }
  }
  get country() {
    return this.countryName;
  }
  set country(newCountry) {
    this.countryName = newCountry;
  }
}
