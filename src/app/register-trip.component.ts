import  { Component,OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";
import {TripService} from "./trip.service";
import {Trip} from "./trip";
import {GoogleMapsService} from "./google-maps.service";
declare var google;

@Component({
  selector:'register-trip',
  templateUrl:'./register-trip.component.html'
})
export class RegisterTripComponent implements OnInit{

  currentUser:User ;
  routes:Array<any> = null;
  selectedRouteIndex:any;
  routeColors:Array<string> = ['red','green','blue','yellow','orange'];
  isRoutesFound:boolean = false;


  constructor(private userService:UserService,private tripService:TripService,private googleMapsService:GoogleMapsService){

    this.currentUser = this.userService.getCurrentUser();

  }

  ngOnInit():void {



  }

  registerTrip(tripStartPoint:HTMLInputElement,tripDestination:HTMLInputElement,tripStartTime:HTMLInputElement){

    let date = new Date(tripStartTime.value);
    let timestamp = date.getTime();
    let trip:Trip = new Trip(this.currentUser,tripStartPoint.value,tripDestination.value,timestamp.toString(),this.selectedRouteIndex,JSON.stringify(this.routes[this.selectedRouteIndex]));
    this.tripService.registerTrip(trip);

  }

  findRoutes(tripStartPoint:HTMLInputElement,tripDestination:HTMLInputElement){
    let tripOriginCoordinatesPromise = this.googleMapsService.getCoordinatesForLocationString(tripStartPoint.value);
    let tripDestinationCoordinatesPromise = this.googleMapsService.getCoordinatesForLocationString(tripDestination.value);
    let that = this;
    Promise.all([tripOriginCoordinatesPromise, tripDestinationCoordinatesPromise]).then(values => {
      console.log(values);
      let tripOriginCoordinates = values[0][0]['geometry']['location'];
      let tripDestinationCoordinates = values[1][0]['geometry']['location'];
      var map;
      var properties = {
        zoom: 20
      };

      map = new google.maps.Map(document.getElementById("map"), properties);
      var promise = this.googleMapsService.getRoutesBetweenLocations(tripOriginCoordinates,
        tripDestinationCoordinates,map);
      promise.then((result) => {
        that.isRoutesFound = true;
        that.routes = result['routes'];
        that.renderDirections(result,map);
      });

    });

  }

  renderDirections(result:any,map:any){

    for(var i = 0 ; i < result['routes'].length ; i++){
      var directionsRenderer = new google.maps.DirectionsRenderer({
        directions: result,
        routeIndex: i,
        map: map,
        polylineOptions: {
          strokeColor: this.routeColors[i]
        }
      });
    }

  }

  routeChanged(event){
    this.selectedRouteIndex = event;
  }

}
