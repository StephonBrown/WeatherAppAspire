import { HttpClient } from "@angular/common/http";
import { Component, OnInit, signal } from '@angular/core';
import { Observable, of, switchMap } from "rxjs";

export type WeatherForecast = {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: []
})
export class App implements OnInit{

  protected readonly title = signal('WeatherApp.client');
  protected forecasts$!: Observable<WeatherForecast[]>;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.forecasts$ = this.httpClient
      .get<WeatherForecast[]>('api/weatherforecast')
      .pipe(switchMap(forecasts => { return of(forecasts)}));
  }
}
