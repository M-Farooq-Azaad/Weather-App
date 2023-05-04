import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  api_key = '2354188de31bbbb180a738a9ba68b80c';
  isLoggedIn = false;
  wrong_credentials = false;
  constructor(private router: Router, private http: HttpClient) { }

  //----------------------------------------------------------------------------------//
  /*          getting Location coordinates using javascript geolocation api           */
  //----------------------------------------------------------------------------------//
  detecting_location() {
    const success = (pos: any) => {
      let crd = pos.coords;
    };
    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }

  //----------------------------------------------------------------------------------//
  /*                                Api provider Function                             */
  //----------------------------------------------------------------------------------//
  api_url_provider(
    service_name: string, lat?: number, lng?: number, city?: string) {
    let api = '';
    /* Api link of converting coordinates into readable form */
    if (service_name == 'location_api') {
      const location_api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${this.api_key}`;
      api = location_api;
    } else if (lat != 0) {
      /* Api for getting forecast using coordinates */
      if (service_name == 'forecast_api') {
        const forecast_api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${this.api_key}`;
        api = forecast_api;
      }
    } else if (service_name == 'forecast_using_name') {
      /* Api for getting forecast using City Name */
      const location_using_name = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.api_key}`;
      api = location_using_name;
    }
    return api;
  }

  //----------------------------------------------------------------------------------//
  /*  Converting User Location from coordinates to readable form using Open Weather Map api      */
  //----------------------------------------------------------------------------------//
  coords_to_location(): Observable<any> {
    const url = this.api_url_provider('location_api', 31.4942518, 74.4173769);
    return this.http.get(url);
  }

  //----------------------------------------------------------------------------------//
  //        Getting Data using City name
  //----------------------------------------------------------------------------------//
  forecast_using_name(location_name: string): Observable<any> {
    const url = this.api_url_provider('forecast_using_name', 0, 0, location_name);
    return this.http.get(url).pipe(
      switchMap((res: any) => {
        return of(res);
      })
    );
  }

  //----------------------------------------------------------------------------------//
  /*         Getting weather Forecast using coordinates from open weather api         */
  //----------------------------------------------------------------------------------//
  forecast_data(lat: number, lng: number): Observable<any> {
    const url = this.api_url_provider('forecast_api', lat, lng);
    return this.http.get(url).pipe(
      switchMap((res: any) => {
        // console.log(res)
        return of(res);
      })
    );
  }

  //----------------------------------------------------------------------------------//
  /*                                      Login                                       */
  //----------------------------------------------------------------------------------//
  username = 'hello';
  password = 'hello';
  get_credentials(user: any, pass: any) {
    if (user == this.username && pass == this.password) {
      this.router.navigate(['weather']);
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      this.wrong_credentials = true;
    }
  }

  //----------------------------------------------------------------------------------//
  /*                          Getting forecast of next days                           */
  //----------------------------------------------------------------------------------//
  weekly_forecast(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.api_key}`;
    return this.http.get<any>(url);
  }

}
