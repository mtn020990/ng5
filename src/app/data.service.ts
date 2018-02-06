import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
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

  private employees=new BehaviorSubject<any>([]);
  public employee =this.employees.asObservable();


  getEmployee()
  {
    this.employee= this.http.get("http://localhost:53035/api/Angular/GetAllEmployee");
    return this.employee;
  }

  deleteEmployee(id)
  {
    let body = JSON.stringify(id);
    this.employee=this.http.post('http://localhost:53035/api/Angular/DeleteEmpoyee',
    body,httpOptions);
    return this.employee;
  }

}
