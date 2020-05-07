import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @Input() data: any[];
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() graphColor: string;

  view: any[] = [900, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;

  gradient = false;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme: any;

  colorSchemeOrange = {domain: ['#ffa91e']};
  colorSchemeRed = {domain: ['#ff0400']};
  colorSchemeGreen = {domain: ['#0fff2b']};

  constructor() {
  }

  ngOnInit(): void {
    if (this.graphColor === 'green') {
      this.colorScheme = this.colorSchemeGreen;
    } else if (this.graphColor === 'red') {
      this.colorScheme = this.colorSchemeRed;
    } else {
      this.colorScheme = this.colorSchemeOrange;
    }
  }

}
