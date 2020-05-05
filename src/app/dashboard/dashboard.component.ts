import {Component, OnInit} from '@angular/core';
import {CoronavirusApiService} from '../services/coronavirus-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  summary: any;
  selectedCountry: string;
  countries: any;
  countryStats: any;

  constructor(private coronavirusApiService: CoronavirusApiService) {
  }

  ngOnInit(): void {
    this.coronavirusApiService.getSummary().subscribe(
      data => {
        this.summary = data;
        this.countries = data.Countries;
        this.countryStats = this.countryStats = this.countries.find(o => o.Slug === 'united-states');
        console.log(this.countryStats);
      },
      error => {
        console.log(error);
      }
    );
  }

  retrieveCountry(event) {
      const countrySlug = event.item.Slug;
      console.log('Selected: ' + countrySlug);
      console.log(this.countries);
      this.countryStats = this.countries.find(o => o.Slug === countrySlug);
  }

}
