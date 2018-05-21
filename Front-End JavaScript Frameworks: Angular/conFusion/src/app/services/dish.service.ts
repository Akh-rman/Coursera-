import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Dish } from "../shared/dish";
//import { DISHES } from "../shared/dishes";
import { baseURL } from "../shared/baseurl";

import { ProcessHTTPMsgService } from "./process-httpmsg.service";

import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DishService {

  constructor(private http: Http, private procesHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + "dishes")
      .map(res => {return this.procesHTTPMsgService.extractData(res);})
      .catch(error => {return this.procesHTTPMsgService.handleError(error);});
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + "dishes/" + id)
      .map(res => {return this.procesHTTPMsgService.extractData(res);})
      .catch(error => {return this.procesHTTPMsgService.handleError(error);});
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + "dishees?featured=true")
      .map(res => {return this.procesHTTPMsgService.extractData(res)[0];})
      .catch(error => {return this.procesHTTPMsgService.handleError(error);});
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => {return dishes.map(dish => dish.id)})
      .catch(error => {return Observable.of(error);});
  }
}
