export default class CountriesApiService {
  constructor() {
    this.countryName = '';
  }
  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this.countryName}`;
    return fetch(url)
      .then(r => r.json())
      .then(data => {return data} );
  }
  get country() {
    return this.countryName;
  }
  set country(newCountry) {
    this.countryName = newCountry;
  }
}

// ${this.countryName}?fields=name,capital,population,flag,languages
