export default class CountriesApiService {
  constructor() {
    this.countryName = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this.countryName}?fields=name,capital,population,flag,languages`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        return error;
      });
  }
  get country() {
    return this.countryName;
  }
  set country(newCountry) {
    this.countryName = newCountry;
  }
}
