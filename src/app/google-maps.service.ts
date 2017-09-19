import {Injectable} from "@angular/core";
declare var google:any;
declare var $:any;

@Injectable()
export class GoogleMapsService {

  /* geocoder = new google.maps.Geocoder();*/

  getCoordinatesForLocationString(locationString:string):Promise<any> {
    var geocoder = new google.maps.Geocoder();
    var def = $.Deferred();
    geocoder.geocode({'address': locationString}, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        def.resolve(results);
      }
      else {
        def.reject(status);
      }
    });
    return def.promise();
  }

  getRoutesBetweenLocations(tripOriginCoordinates:any,tripDestinationCoordinates:any,
  map:any):Promise<any> {

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay;

    directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    var marker = new google.maps.Marker({
      animation: google.maps.Animation.BOUNCE,
    });

    marker.setMap(map);

    var start = new google.maps.LatLng(tripOriginCoordinates.lat(), tripOriginCoordinates.lng());
    var end = new google.maps.LatLng(tripDestinationCoordinates.lat(), tripDestinationCoordinates.lng());
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true

    };
    var def = $.Deferred();
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        def.resolve(result);
      } else {
        def.reject(status);
      }
    });
    return def.promise();
  }

}
