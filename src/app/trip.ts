import {User} from "./user";
export class Trip{
  constructor(private tripOwner:User, private tripStartPoint:string,private tripDestination:string,private tripStartTime:any,private tripRouteIndex:number,private routeObject:any){

  }
}
