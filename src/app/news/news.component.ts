import {Component, OnInit} from '@angular/core';
import {NewsService} from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles = [];
  data: any;

  keywords = ['coronavirus', 'covid', 'masks', 'hospital', 'respirator',
    'cases', 'deaths', 'death', 'vaccine', 'virus', 'outbreak', 'test'];

  constructor(private newsService: NewsService) {
  }

  ngOnInit(): void {
    const params = {};
    this.newsService.getNews(params).subscribe(
      data => {
        this.data = data;
        const tempArray = [];
        data.news.forEach(article => {
          if (this.isGoodArticle(article)) {
            tempArray.push(article);
          }
        });
        this.articles = tempArray;
      }
    );
  }

  /**
   * Filter article list, retrieving those that have images and match covid keywords
   */
  private isGoodArticle(article) {
    let isMatching = false;
    this.keywords.forEach(keyword => {
      if (article.title.includes(keyword)) {
        isMatching = true;
      }
    });
    return isMatching && article.images && article.images.length > 0 && article.provider.name !== 'Fox News';
  }

}
