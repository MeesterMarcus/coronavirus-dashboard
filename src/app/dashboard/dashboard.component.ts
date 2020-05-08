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

  totalConfirm: number;
  totalDeath: number;
  totalRecov: number;
  date: any;

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
    const sz = data.length;
    let i = 0;
    data.forEach(o => {
      if (i > 0) {
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
      }
      i++;
    });
    this.countryConfirmedDayOne = confirmed;
    this.countryDeathsDayOne = deaths;
    this.countryRecoveredDayOne = recovered;

    this.countryNewConfirm = data[sz - 1].Confirmed - data[sz - 2].Confirmed;
    this.countryNewDeath = data[sz - 1].Deaths - data[sz - 2].Deaths;
    this.countryNewRecov = data[sz - 1].Recovered - data[sz - 2].Recovered;
    this.totalConfirm = data[sz - 1].Confirmed;
    this.totalDeath = data[sz - 1].Deaths;
    this.totalRecov = data[sz - 1].Recovered;
    this.date = data[sz - 1].Date.substring(0, 10);

  }

}
