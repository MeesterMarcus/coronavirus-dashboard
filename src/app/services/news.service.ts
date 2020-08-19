import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  NEWS_API_URL = 'https://api.smartable.ai/coronavirus/news/US';
  API_KEY = 'dffb8de11e4a4a32816165d5c5cd273f';

  constructor(private http: HttpClient) { }

  /**
   * NOVEL_COVID_19 News
   */
  getNews(queryParams): any {
    const headerObj = {
      'Subscription-Key': this.API_KEY
    };
    return this.http.get(this.NEWS_API_URL, {
      params: queryParams,
      headers: headerObj
    });
  }
}
