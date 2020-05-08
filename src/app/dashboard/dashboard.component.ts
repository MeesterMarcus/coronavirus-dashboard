import {Component, OnInit} from '@angular/core';
import {CoronavirusApiService} from '../services/coronavirus-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedCountry: string;
  countries: any;
  countryStats: any;

  countryHistorical: any;
  countryHistoricalCases: any[];
  countryHistoricalDeaths: any[];



  globalData: any;

  constructor(private coronavirusApiService: CoronavirusApiService) {
  }

  ngOnInit(): void {
    this.coronavirusApiService.getGlobal().subscribe(
      data => {
        console.log(data);
        this.globalData = data;
      },
      error => {
        console.log(error);
      }
    );
    this.coronavirusApiService.getCountries().subscribe(
      data => {
        this.countries = data;
        this.selectedCountry = 'USA';
        this.countryStats = this.countries.find(o => o.country === 'USA');
        this.getHistorical('USA');
      },
      error => {
        console.log(error);
      }
    );
  }

  retrieveCountry(event) {
    const country = event.item.country;
    this.countryStats = this.countries.find(o => o.country === country);
    this.getHistorical(country);
  }

  private getHistorical(country) {
    this.coronavirusApiService.getHistorical(country).subscribe(
      histData => {
        this.countryHistorical = histData;
        this.countryHistoricalCases = this.generateChangeTimeline(this.countryHistorical.timeline.cases);
        this.countryHistoricalDeaths = this.generateChangeTimeline(this.countryHistorical.timeline.deaths);
      },
      error => {
        console.log(error);
      }
    );
  }

  private generateTimeline(data) {
    const timeline = [];
    Object.entries(data).forEach(o => {
      const newObj: any = {};
      newObj.name = o[0];
      newObj.value = o[1];
      timeline.push(newObj);
    });
    return timeline;
  }

  private generateChangeTimeline(data) {
    const timeline = [];
    let i = 0;
    const dataArray = Object.entries(data);
    let previousValue = null;
    dataArray.forEach(o => {
      if (i > 0) {
        const newObj: any = {};
        newObj.name = o[0];
        newObj.value = o[1] as any - previousValue;
        timeline.push(newObj);
        previousValue = o[1];
      }
      previousValue = o[1];
      i++;
    });
    return timeline;
  }

}
