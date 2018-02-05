import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { debug } from 'util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  private goals = new BehaviorSubject<any>(['The initial goal','Another silly life goal']);
  goal = this.goals.asObservable();

  constructor(private http:HttpClient) { }

  changeGoal(goal){
    this.goals.next(goal);
  }

  private employees= new BehaviorSubject<any>([]);
  employee=this.employees.asObservable();

  getEmployee()
  {
    this.employee=this.http.get("http://localhost:53035/api/Angular/GetAllEmployee");
    return this.employee;
  }

}
