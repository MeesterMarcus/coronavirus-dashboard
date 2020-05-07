import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CoronavirusApiService} from './services/coronavirus-api.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {FormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    NgxChartsModule,
  ],
  providers: [
    CoronavirusApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
