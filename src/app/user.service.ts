import {Injectable} from '@angular/core';
import { Http,RequestOptionsArgs,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'
import {User} from "./user";

@Injectable()
export class UserService {

  isUserLoggedIn:boolean = false;

  currentUser:User;

  constructor(private http:Http){
  }

  attemptLogin(username:string,password:string):Promise<any>{
    let requestOptions: RequestOptionsArgs = new RequestOptions({withCredentials:true});
    return this.http.post('http://localhost:8080/perform_login',this.getFormData(username,password),requestOptions)
      .toPromise().then((response) => {
      return response;
    }).catch((error) => {
        console.log(error);
      });
  }

  getAuthenticatedMessage():Promise<string>{
    let requestOptions: RequestOptionsArgs = new RequestOptions({
      withCredentials:true
    });
    return this.http.get('http://localhost:8080/api/authMessage',requestOptions).toPromise().then((response) => {
      console.log(response);
      return response['_body'];
    })
  }

  getFormData(username:string,password:string): FormData {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return formData;
  }

  checkUserLoggedIn():boolean{
    return this.isUserLoggedIn;
}

  signUpUser(user:User):Promise<User>{
    return this.http.post('http://localhost:8080/api/signUp',user).toPromise().then((response) => {
      return response.json() as User;
    });
  }

  getCurrentUser():User{
    return this.currentUser;
  }

  setIsUserLoggedIn(value:boolean){
    this.isUserLoggedIn = value;
  }

  loadUserDetails(username):Promise<User>{
    let requestOptions: RequestOptionsArgs = new RequestOptions({withCredentials:true});
    return this.http.get('http://localhost:8080/api/user?username=' + username,requestOptions).toPromise().then((response) => {
      let user:User = response.json() as User;
      this.currentUser = user;
      return user;
    });
  }

}
