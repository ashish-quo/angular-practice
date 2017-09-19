import { Component,OnInit,Input,SimpleChanges } from '@angular/core';
declare var google: any;
@Component({
  selector:'google-maps',
  templateUrl:'./map.component.html'
})
export class MapComponent implements OnInit{

  private API_KEY:string = "AIzaSyCuLh3H3LsTfYB8BxBuUj11e3izw0B-cTo";

  @Input() private locationString:string = "Janakpuri west,New Delhi";
  private locationLat:number;
  private locationLong:number;
  directionsDisplay:any = new google.maps.DirectionsRenderer;
  geocoder:any = new google.maps.Geocoder();

  ngOnInit() {

    var directionsService = new google.maps.DirectionsService;
    /*var directionsDisplay = new google.maps.DirectionsRenderer;
    var geocoder = new google.maps.Geocoder();*/

    var that:any = this;
    this.geocoder.geocode( { 'address': this.locationString}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        that.locationLat = results[0].geometry.location.lat();
        that.locationLong = results[0].geometry.location.lng();
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: {lat: that.locationLat, lng: that.locationLong}
        });
        that.directionsDisplay.setMap(map);
      }
    });
    //calculateAndDisplayRoute(directionsService, directionsDisplay);

    /*function calculateAndDisplayRoute(directionsService, directionsDisplay) {

      var waypts = [];
      var checkboxArray:any[] = [
        'winnipeg', 'regina', 'calgary'
      ];
      for (var i = 0; i < checkboxArray.length; i++) {

        waypts.push({
          location: checkboxArray[i],
          stopover: true
        });

      }

      directionsService.route({
        origin: {lat: 41.85, lng: -87.65},
        destination: {lat: 49.3, lng: -123.12},
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }*/

  }

  locationChanged(searchField:HTMLInputElement) {
    var that:any = this;
    this.geocoder.geocode( { 'address': searchField.value}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        that.locationLat = results[0].geometry.location.lat();
        that.locationLong = results[0].geometry.location.lng();
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: that.locationLat, lng: that.locationLong}
        });
        that.directionsDisplay.setMap(map);
      }
    });
  }

}
