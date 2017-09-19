import {Component} from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector:'navigation-comp',
  templateUrl:'./navigation.component.html'
})
export class NavigationComponent{

  constructor(private userService:UserService){

  }

  isUserLoggedIn():boolean{
    return this.userService.checkUserLoggedIn();
  }

}
