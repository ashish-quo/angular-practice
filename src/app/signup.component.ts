import {Component} from "@angular/core";
import {UserService} from "./user.service";
import {User} from "./user";

@Component({
  selector:'sign-up',
  templateUrl:'./signup.component.html'
})
export class SignUpComponent{

  constructor(private userService:UserService){

  }

  signUpUser(username:HTMLInputElement,password:HTMLInputElement,name:HTMLInputElement,
             contact:HTMLInputElement,address:HTMLInputElement){
    let user:User = new User(name.value,username.value,password.value,contact.value,address.value);
    this.userService.signUpUser(user);
  }

}
