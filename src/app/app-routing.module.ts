import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WeatherComponent } from './weather/weather.component';
import { AuthGuard } from './auth.guard';
import { LostpageComponent } from './lostpage/lostpage.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'weather', component: WeatherComponent , canActivate:[AuthGuard]},
  {path:'**' , component:LostpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
