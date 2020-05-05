import {Component, OnInit} from '@angular/core';
import {CoronavirusApiService} from '../services/coronavirus-api.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Angular Charts';

  view: any[] = [900, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  // showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Confirmed Cases';
  // timeline = true;

  colorScheme = {
    domain: ['#FF7F50']
  };

  showLabels = true;
  summary: any;
  selectedCountry: string;
  countries: any;
  countryStats: any;
  countryStatsDayOne: any[];

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
    console.log('Selected: ' + countrySlug);
    this.countryStats = this.countries.find(o => o.Slug === countrySlug);
    this.getStatsByCountry(countrySlug);
  }

  getStatsByCountry(countrySlug) {
    this.coronavirusApiService.getStatsByCountry(countrySlug).subscribe(
      data => {
        // this.countryStatsDayOne = data;
        const tempArray = [];
        data.forEach(o => {
          const newObj: any = {};
          newObj.name = o.Date.substring(0,10);
          newObj.value = o.Confirmed;
          tempArray.push(newObj);
        });
        this.countryStatsDayOne = tempArray;
      },
      error => {
        console.log(error);
      }
    );
  }

}
