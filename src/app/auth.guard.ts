import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
   a:any = ''
  constructor(private service: WeatherService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      this.a = localStorage.getItem('isLoggedIn');
      this.a = (Boolean(this.a));
      return this.a;
  }
}
