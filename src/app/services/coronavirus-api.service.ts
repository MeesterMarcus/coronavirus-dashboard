import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusApiService {

  NOVEL_COVID_API = 'https://disease.sh/v2/';

  constructor(private http: HttpClient) {
  }

  /**
   * NOVEL_COVID_19
   */
  getGlobal(queryParams): any {
    return this.http.get(this.NOVEL_COVID_API + 'all', {
      params: queryParams
    });
  }

  getCountries(queryParams): any {
    return this.http.get(this.NOVEL_COVID_API + 'countries', {
      params: queryParams
    });
  }

  getHistorical(country, queryParams): any {
    return this.http.get(this.NOVEL_COVID_API + 'historical/' + country, {
        params: queryParams
      });
  }

}
