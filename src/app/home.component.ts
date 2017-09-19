import {Component,OnInit,Output,EventEmitter} from '@angular/core';
import {SearchService} from "./search.service";
import {Observable} from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';
import {Router,Routes} from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Video} from "./video";
import {UserService} from "./user.service";
import {User} from "./user";
import {SearchTripComponent} from "./search-trip.component";
import {RegisterTripComponent} from "./register-trip.component";


@Component({
  selector: 'home-comp',
  templateUrl: './home.component.html',
  providers: [SearchService]
})
export class HomeComponent implements OnInit {

  user:User;

  constructor(private userService:UserService,private router:Router) {

  }

  ngOnInit():void {

    this.loadUserDetails();

  }

  loadUserDetails(){
    let that = this;
    this.userService.loadUserDetails(sessionStorage.getItem("username")).then((res) => {
      that.user = res;
      that.router.navigate(['/search-trip']);
    });
  }

}
