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
  getGlobal(): any {
    return this.http.get(this.NOVEL_COVID_API + 'all');
  }

  getCountries(): any {
    return this.http.get(this.NOVEL_COVID_API + 'countries');
  }

  getHistorical(country): any {
    return this.http.get(this.NOVEL_COVID_API + 'historical/' + country);
  }

}
