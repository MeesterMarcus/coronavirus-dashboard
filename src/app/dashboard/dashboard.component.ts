import {Component, OnInit} from '@angular/core';
import {CoronavirusApiService} from '../services/coronavirus-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  summary: any;
  selectedCountry: string;
  countries: any;
  countryStats: any;
  countryConfirmedDayOne: any[];
  countryDeathsDayOne: any[];
  countryRecoveredDayOne: any[];
  usDailyAll: any[];
  usDaily: any[];
  usStatistics: any;
  isCollapsed = false;

  constructor(private coronavirusApiService: CoronavirusApiService) {
  }

  ngOnInit(): void {
    this.coronavirusApiService.getSummary().subscribe(
      data => {
        this.summary = data;
        this.countries = data.Countries;
        this.countryStats = this.countryStats = this.countries.find(o => o.Slug === 'united-states');
        this.getStatsByCountry('united-states');
        this.retrieveUs();
        this.retrieveUsDaily();
      },
      error => {
        console.log(error);
      }
    );
  }

  retrieveCountry(event) {
    const countrySlug = event.item.Slug;
    this.countryStats = this.countries.find(o => o.Slug === countrySlug);
    this.getStatsByCountry(countrySlug);
  }

  retrieveUs() {
    this.coronavirusApiService.getUsStatistics().subscribe(
      data => {
        this.usStatistics = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  retrieveUsDaily() {
    this.coronavirusApiService.getUsStatisticsDaily().subscribe(
      data => {
        this.usDailyAll = data.reverse();
        const daily = [];
        const dailyData = data.reverse().slice(data.length - 60, data.length);
        dailyData.forEach(o => {
          const dailyObj: any = {};
          const date = o.date + '';
          const formattedDate = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8);
          dailyObj.name = formattedDate;
          if (o.deathIncrease === null) {
            dailyObj.value = 0;
          } else {
            dailyObj.value = o.deathIncrease;
          }
          daily.push(dailyObj);
        });
        this.usDaily = daily;
      },
      error => {
        console.log(error);
      }
    );
  }

  getStatsByCountry(countrySlug) {
    this.coronavirusApiService.getStatsByCountry(countrySlug).subscribe(
      data => {
        // console.log(data);
        const truncatedData = data.slice(data.length - 60, data.length);
        this.separateData(truncatedData);
      },
      error => {
        console.log(error);
      }
    );
  }

  private separateData(data) {
    const confirmed = [];
    const deaths = [];
    const recovered = [];
    data.forEach(o => {
      const confirmedObj: any = {};
      const deathsObj: any = {};
      const recoveredObj: any = {};
      confirmedObj.name = o.Date.substring(0, 10);
      confirmedObj.value = o.Confirmed;
      confirmed.push(confirmedObj);

      deathsObj.name = o.Date.substring(0, 10);
      deathsObj.value = o.Deaths;
      deaths.push(deathsObj);

      recoveredObj.name = o.Date.substring(0, 10);
      recoveredObj.value = o.Recovered;
      recovered.push(recoveredObj);
    });
    this.countryConfirmedDayOne = confirmed;
    this.countryDeathsDayOne = deaths;
    this.countryRecoveredDayOne = recovered;
  }

}
