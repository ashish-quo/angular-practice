import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'
import {Video} from "./video";

@Injectable()
export class SearchService{

  API_KEY:string='AIzaSyBu7LV0D2zwmA1bBI1aBr6EhhG5NUIahms';

  constructor(private http:Http){
  }

  searchByTerm(keyword:string):Observable<Video[]>{
    let query:string = [
      `key=`+this.API_KEY,
      `part=snippet`,
      `maxResults=25`,
      `q=${keyword}`,
      `type=""`
    ].join("&");
    return this.http.get('https://www.googleapis.com/youtube/v3/search?' + query).map((response) => {
      var videos:Video[] = response.json().items as Video[];
      return videos;
    });
    /*return this.http.get('https://www.googleapis.com/youtube/v3/search?' + query).toPromise().then((response) => {
      response.json().items as Video[];
      return videos;
    });*/
  }

}
