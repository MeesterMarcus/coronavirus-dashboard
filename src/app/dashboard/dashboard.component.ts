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

  countryNewConfirm: number;
  countryNewDeath: number;
  countryNewRecov: number;

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
    let prevDeaths = 0;
    let prevConfirmed = 0;
    let prevRecov = 0;
    data.forEach(o => {
      const confirmedObj: any = {};
      const deathsObj: any = {};
      const recoveredObj: any = {};

      confirmedObj.name = o.Date.substring(0, 10);
      confirmedObj.value = o.Confirmed - prevConfirmed;
      prevConfirmed = o.Confirmed;
      confirmed.push(confirmedObj);

      deathsObj.name = o.Date.substring(0, 10);
      deathsObj.value = o.Deaths - prevDeaths;
      prevDeaths = o.Deaths;
      deaths.push(deathsObj);

      recoveredObj.name = o.Date.substring(0, 10);
      recoveredObj.value = o.Recovered - prevRecov;
      prevRecov = o.Recovered;
      recovered.push(recoveredObj);
    });
    this.countryConfirmedDayOne = confirmed;
    this.countryDeathsDayOne = deaths;
    this.countryRecoveredDayOne = recovered;

    this.countryNewConfirm = data[this.countryConfirmedDayOne.length - 1].Confirmed - data[this.countryConfirmedDayOne.length - 2].Confirmed;
    this.countryNewDeath = data[this.countryConfirmedDayOne.length - 1].Deaths - data[this.countryConfirmedDayOne.length - 2].Deaths;
    this.countryNewRecov = data[this.countryConfirmedDayOne.length - 1].Recovered - data[this.countryConfirmedDayOne.length - 2].Recovered;
    console.log(this.countryConfirmedDayOne);
  }

}
