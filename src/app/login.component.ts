import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {UserService} from "./user.service";

@Component({
  selector:'login-comp',
  templateUrl:'./login.component.html'
})
export class LoginComponent{

  authenticatedMessage = 'Empty Message';

  constructor(private userService:UserService,private router:Router){

  }

  attemptLogin(usernameField:HTMLInputElement,passwordField:HTMLInputElement):boolean{
    console.log(`Credentials entered were : ${usernameField.value} and ${passwordField.value}.`);
    this.userService.attemptLogin(usernameField.value,passwordField.value).then((res) => {
      console.log(res);
      if(res.status == 200){
        this.userService.setIsUserLoggedIn(true);
        sessionStorage.setItem("username",usernameField.value);
        this.router.navigate(["/home"]);
      }
    });
    return false;
  }



  getAuthenticatedMessage():boolean{
    this.userService.getAuthenticatedMessage().then((result) => {
      console.log(result);
      this.authenticatedMessage = result;
    });
    return false;
  }

}
