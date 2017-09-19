import {Component,Input} from '@angular/core';
import {Trip} from "./trip";

@Component({
  selector:'tripSearchResult',
  templateUrl:'./trip-search-result.component.html'
})
export class TripResultSearchComponnet{

  @Input() trip:Trip;

}
