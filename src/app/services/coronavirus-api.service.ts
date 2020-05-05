import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusApiService {

  BASE_API = 'https://api.covid19api.com/';

  constructor(private http: HttpClient) {
  }

  getSummary() {
    return this.http.get(this.BASE_API + 'summary');
  }

}
