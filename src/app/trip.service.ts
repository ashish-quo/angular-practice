import {Injectable} from "@angular/core";
import {Http,RequestOptionsArgs,RequestOptions,Headers} from "@angular/http";
import {Trip} from "./trip";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class TripService {

  constructor(private http:Http) {

  }

  registerTrip(trip:Trip) {

    let requestOptions:RequestOptionsArgs = new RequestOptions({withCredentials: true});
    this.http.post('http://localhost:8080/api/trip', trip, requestOptions).toPromise().then((res) => {
      console.log('Trip Saved!!!!!');
    });

  }

  searchTrips(tripSource:string, tripDestination:string, tripTimeLowerBound:string,
              tripTimeUpperBound:string):Promise<Trip[]> {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let requestOptions:RequestOptionsArgs = new RequestOptions({withCredentials: true,headers:headers});
      return this.http.post('http://localhost:8080/api/trips', {
      'tripSource': tripSource, 'tripDestination': tripDestination,
      'tripTimeLowerBound': tripTimeLowerBound, 'tripTimeUpperBound': tripTimeUpperBound
    }, requestOptions).toPromise().then((res) => {
      return res.json() as Trip[];
    });

  }

}
