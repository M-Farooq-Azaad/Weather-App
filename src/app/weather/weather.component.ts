import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from './types';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  something:any[] = []
  cityName: any = '';
  forecast: any = '';
  week_Forecast: WeatherData = {};
  today = new Date();
  search_location = false;
  auto_location = false;
  location_options = true;
  error_popUp = false;
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentDay = this.today.toLocaleDateString('en-US', { weekday: 'long' });
  month = this.today.toLocaleDateString('en-US', { month: 'long' });
  date = this.today.toLocaleDateString('en-US', { day: 'numeric' });
  year = this.today.toLocaleDateString('en-US', { year: 'numeric' });

  //----------------------------------------------------------------------------------//
  /*                                      Contructor                                   */
  //----------------------------------------------------------------------------------//
  constructor(private service: WeatherService, private router: Router, private http: HttpClient) {
    setTimeout(() => {
      console.log(this.something[0].day)
    }, 2000);
   }

  //----------------------------------------------------------------------------------//
  /*                                      Ng OnInit                                   */
  //----------------------------------------------------------------------------------//
  ngOnInit(): void {
    this.location();
    this.forecast_by_name('Faisalabad');
  }

  //----------------------------------------------------------------------------------//
  /*                   Unix timestamp dt:1683104400 to readable form                  */
  //----------------------------------------------------------------------------------//
  dt_to_dayName(dt_value: any) {
    const date = new Date(dt_value * 1000);
    const dayName = this.daysOfWeek[date.getDay()];
    return dayName;
  }

  //----------------------------------------------------------------------------------//
  /*                          Getting foreCast using Coordinates                           */
  //----------------------------------------------------------------------------------//
  week_forecast_with_coords(lat: number, lng: number) {
    this.service.forecast_data(lat, lng).subscribe({
      next: (data) => {
        Object.keys(this.week_Forecast).forEach((key) => {
          delete this.week_Forecast[key];
        });
        for (let i = 0; i < data.list.length; i++) {
          /* dt to readable form conversion method */

          const dayName = this.dt_to_dayName(data.list[i].dt);
          /* removing duplicates */
          if (dayName in this.week_Forecast) {
          } else {
            let result = {
              day: dayName,
              temp: data.list[i].main.temp - 273.15,
              icon: data.list[i].weather[0].icon,
            };
            this.week_Forecast[dayName] = result;
            this.something.push(result);
            console.log(this.something)
          }
        }
      },
      /* Error Part */
      error: (err) => {
        console.log(err);
      },
    });
  }

  //----------------------------------------------------------------------------------//
  /*                 Getting forecast of next days with city Name                     */
  //----------------------------------------------------------------------------------//
  week_forecast(area_name: string) {
    this.service.weekly_forecast(area_name).subscribe({
      next: (data) => {
        this.error_popUp = false;
        Object.keys(this.week_Forecast).forEach((key) => {
          delete this.week_Forecast[key];
        });
        for (let i = 0; i < data.list.length; i++) {
          /* dt to readable form conversion method */
          const dayName = this.dt_to_dayName(data.list[i].dt);
          /* removing duplicates */
          if (dayName in this.week_Forecast) {
          } else {
            let result = {
              day: dayName,
              temp: data.list[i].main.temp - 273.15,
              icon: data.list[i].weather[0].icon,
            };
            this.week_Forecast[dayName] = result;
            // this.something.push(result)
          }
        }
      },
      /* Error Part */
      error: (err) => {
        this.error_popUp = true;
      },
    });
  }
  //----------------------------------------------------------------------------------//
  /*                       Getting Location Name from Coordinates                     */
  //----------------------------------------------------------------------------------//
  coordinates_to_location(lat: number, lng: number) {
    this.service.coords_to_location().subscribe((data: any) => {
      this.cityName = data[0];
    });
  }
  //----------------------------------------------------------------------------------//
  /*                          Getting Data using City name                           */
  //----------------------------------------------------------------------------------//
  public area: any;
  forecast_by_name(area_name: string) {
    this.cityName = area_name;
    this.week_forecast(area_name);
    this.service.forecast_using_name(area_name).subscribe({
      next: (data) => {
        const data_one = data.main;
        this.forecast = {
          temp: data_one.temp,
          humidity: data_one.humidity,
          pressure: data_one.pressure,
          weather: data.weather[0].main,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
        };
      },
      /* Error part */
      error: (err) => {
      },
    });
  }

  //----------------------------------------------------------------------------------//

  /*          getting Location coordinates using javascript geolocation api           */
  //----------------------------------------------------------------------------------//
  location() {
    const success = (pos: any) => {
      const crd = pos.coords;
      this.coordinates_to_location(crd.latitude, crd.longitude);
      let city: any = '';
      setTimeout(() => {
        this.forecast_by_name(this.cityName.name);
      }, 1000);
      this.week_forecast_with_coords(crd.latitude, crd.longitude);
    };
    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }

  //----------------------------------------------------------------------------------//
  /*                    logic of location selector modal      HTML                    */
  //----------------------------------------------------------------------------------//
  location_selector(a: any) {
    if (a == 'auto') {
      this.auto_location = true;
    } else if (a == 'search') {
      this.search_location = true;
    }
    this.location_options = false;
  }
  location_selector_backword() {
    this.location_options = true;
    setTimeout(() => {
      this.auto_location = false;
      this.search_location = false;
    }, 10);
  }

  //----------------------------------------------------------------------------------//
  /*                                 Logout Function                                  */
  //----------------------------------------------------------------------------------//
  LogOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
