import {Component, OnInit} from '@angular/core';
import {CoronavirusApiService} from '../services/coronavirus-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Variables
  globalData: any;
  selectedCountry: string;
  countries: any;
  countryStats: any;
  countryHistorical: any;
  countryHistoricalCases: any[];
  countryHistoricalDeaths: any[];
  defaultDays = 30;

  constructor(private coronavirusApiService: CoronavirusApiService) {
  }

  ngOnInit(): void {
    this.getGlobalData();
    this.getCountriesData();
  }

  /**
   * Get global statistics
   */
  private getGlobalData() {
    const params = {};
    this.coronavirusApiService.getGlobal(params).subscribe(
      data => {
        this.globalData = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Get list of countries with respective data
   */
  private getCountriesData() {
    const params = {};
    this.coronavirusApiService.getCountries(params).subscribe(
      data => {
        this.countries = data;
        this.selectedCountry = 'USA';
        this.countryStats = this.countries.find(o => o.country === 'USA');
        this.getHistorical('USA', this.defaultDays);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Find country within countries list by country name
   * @param event: the event passed from input selection
   */
  retrieveCountry(event) {
    const country = event.item.country;
    this.countryStats = this.countries.find(o => o.country === country);
    this.getHistorical(country, this.defaultDays);
  }

  /**
   * Retrieve historical data
   * @param country: requested country e.g. USA
   */
  private getHistorical(country, lastDays) {
    const params = {lastdays: lastDays};
    this.coronavirusApiService.getHistorical(country, params).subscribe(
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

  /**
   * Transform data for traditional bar graph
   * @param data: the timeline data
   */
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

  /**
   * Transform data for daily change bar graph
   * @param data: the timeline data
   */
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
