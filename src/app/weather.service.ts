import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() {
    function success(pos: any) {
      const crd = pos.coords;
    }
    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }
  getting_weather(lat: any, lng: any) {
    const api_key = '2354188de31bbbb180a738a9ba68b80c';
    const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${api_key}`;
    // console.log(weather_url);
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }
}
