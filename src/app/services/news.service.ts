import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  NEWS_API_URL = 'https://coronavirus-smartable.p.rapidapi.com/news/v1/US/';

  headerObj: any = {
    'x-rapidapi-host': 'coronavirus-smartable.p.rapidapi.com',
    'x-rapidapi-key': '9ff1614606msh08f8f40fdf29d97p1c6f75jsnb8f64eb503b4',
    useQueryString: true
  };

  constructor(private http: HttpClient) {
  }

  /**
   * NOVEL_COVID_19 News
   */
  getNews(queryParams): any {

    return this.http.get(this.NEWS_API_URL, {
      params: queryParams,
      headers: this.headerObj
    });
  }
}
