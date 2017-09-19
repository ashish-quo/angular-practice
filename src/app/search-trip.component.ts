import  { Component,ViewChildren, QueryList,NgZone} from '@angular/core';
import {TripService} from "./trip.service";
import {Trip} from "./trip";
import {GoogleMapsService} from "./google-maps.service";
declare var google:any;
declare var $:any;

@Component({
  selector:'search-trip',
  templateUrl:'./search-trip.component.html'
})
export class SearchTripComponent{

  private searchTripResults:Array<Trip>=[];

  @ViewChildren('tripResults') tripResults:QueryList<any>;

  constructor(private zone:NgZone,private tripService:TripService,private googleMapsService:GoogleMapsService){

  }

  searchTrips(tripSource:HTMLInputElement,tripDestination:HTMLInputElement,tripTimeLowerBound:HTMLInputElement,
              tripTimeUpperBound:HTMLInputElement){

    this.searchTripResults=[];
    let tripTimeLowerBoundTimestamp = new Date(tripTimeLowerBound.value);
    let timestamp1 = tripTimeLowerBoundTimestamp.getTime()/1000;
    let tripTimeUpperBoundTimestamp = new Date(tripTimeUpperBound.value);
    let timestamp2 = tripTimeUpperBoundTimestamp.getTime()/1000;
    this.tripService.searchTrips(tripSource.value,tripDestination.value,timestamp1.toString(),timestamp2.toString()).then((trips:Trip[]) => {
      this.checkMatchingTrips(trips,tripDestination.value);
    });

  }

  ngAfterViewInit() {
    this.tripResults.changes.subscribe(t => {
      console.log(t);
      this.ngForRendred();
    })
  }

  checkMatchingTrips(trips:Trip[],tripDestination:string){

    this.googleMapsService.getCoordinatesForLocationString(tripDestination).then((res) => {
      console.log(res[0]['geometry']['location']);
      var desCoords = res[0]['geometry']['location'];
      var destination = new google.maps.LatLng(desCoords.lat(), desCoords.lng());
      let isTripFound:boolean=false;
      for(var a = 0 ; a < trips.length ; a++){
        let currentTrip:Trip = trips[a];
        var pathArray:Array<any>=[];

        var bounds = new google.maps.LatLngBounds();

        var legs = JSON.parse(currentTrip['routeObject']).legs;
        for (var i=0;i<legs.length;i++) {
          var steps = legs[i].steps;
          for (var j=0;j<steps.length;j++) {
            var nextSegment = steps[j].path;
            for (var k=0;k<nextSegment.length;k++) {
              pathArray.push(nextSegment[k]);
              bounds.extend(nextSegment[k]);
            }
          }
        }

        var polyline = new google.maps.Polyline({
          path: pathArray,
          strokeColor: '#0000FF',
          strokeWeight: 3
        });

        var mapOptions = {
          zoom: 12,
          center: destination
        };

        /*var map = new google.maps.Map(document.getElementById('map'),
          mapOptions);
*/
        if (google.maps.geometry.poly.isLocationOnEdge(destination, polyline, 10e-3)) {
          console.log("Trip with tripIndex " + a + " has destination on its way!!!!!");
          isTripFound=true;
          this.zone.run(() => {
            this.searchTripResults.push(currentTrip);
          });
        }
      }
      if(!isTripFound){
        $("#no-results-message").show();
        setTimeout(function(){
          $("#no-results-message").hide();
        },3000);
      }
    });

  }

  ngForRendred() {
    console.log('NgFor is Rendered');
    /*var map = new google.maps.Map(document.getElementById(currentTrip['tripOwner']['name']),
      mapOptions);
    polyline.setMap(map);
    map.fitBounds(bounds);*/
  }

}
