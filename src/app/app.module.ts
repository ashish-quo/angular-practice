import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import {HomeComponent} from "./home.component";
import {SearchService} from "./search.service";
import {LoginComponent} from "./login.component";
import {UserService} from "./user.service";
import {SignUpComponent} from "./signup.component";
import {MapComponent} from "./map.component";
import {User} from "./user";
import {SearchTripComponent} from "./search-trip.component";
import {RegisterTripComponent} from "./register-trip.component";
import {NavigationComponent} from "./navigation.component";
import {TripService} from "./trip.service";
import {TripResultSearchComponnet} from "./trip-search-result.component";
import {GoogleMapsService} from "./google-maps.service";
import {FormsModule} from "@angular/forms";

export const routes:Routes=[
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'search-trip',component:SearchTripComponent},
  {path:'register-trip',component:RegisterTripComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    MapComponent,
    SearchTripComponent,
    RegisterTripComponent,
    NavigationComponent,
    TripResultSearchComponnet
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    SearchService,
    UserService,
    TripService,
    GoogleMapsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
