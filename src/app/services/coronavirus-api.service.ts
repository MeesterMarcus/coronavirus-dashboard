import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusApiService {

  BASE_API = 'https://api.covid19api.com/';

  constructor(private http: HttpClient) {
  }

  /**
   * BASE_API
   */
  getSummary(): any {
    return this.http.get(this.BASE_API + 'summary');
  }

  getCountries(): any {
    return this.http.get(this.BASE_API + 'countries');
  }

  getStatsByCountry(countrySlug): any {
    return this.http.get(this.BASE_API + 'country' + '/' + countrySlug);
  }

}
