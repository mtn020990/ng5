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

  public data:any;


  getEmployee(pageIndex:number, pageSize:number)
  {
    let body=JSON.stringify({"PageIndex":pageIndex,"PageSize":pageSize});
    this.data=this.http.post("http://localhost:53035/api/Angular/GetAllEmployee" ,body,httpOptions);
    return this.data;
  }

  deleteEmployee(pageIndex:number, pageSize:number,id:any)
  {
    let body=JSON.stringify({"PageIndex":pageIndex,"PageSize":pageSize,"Id":id});
    this.data=this.http.post('http://localhost:53035/api/Angular/DeleteEmpoyee',
    body,httpOptions);
    return this.data;
  }

}
