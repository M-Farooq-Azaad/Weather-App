import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
declare var $: any;
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  constructor(private weather_service:WeatherService) {


  }
}
