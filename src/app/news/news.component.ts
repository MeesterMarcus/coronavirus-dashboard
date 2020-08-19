import { Component, OnInit } from '@angular/core';
import {NewsService} from '../services/news.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles: any;
  data: any;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    const params = {};
    this.newsService.getNews(params).subscribe(
      data => {
        this.data = data;
        this.articles = data.news;
      }
    );
  }

}
