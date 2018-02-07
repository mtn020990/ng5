import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { error } from 'util';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

      trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),
           
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
     ])


  ]
})
export class HomeComponent implements OnInit {

  itemCount:number=4;
  btnText:string ='Add an item';
  goalText:string='My first life goal';
  goals = [];
  employees=[];
  total:any;
  pageSize=5;
  maxSize=5;
  selectedPage=1;
  previousPage:any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _data:DataService) {   
  }

  ngOnInit() {
    this._data.goal.subscribe(res=>this.goals=res);   
    this.itemCount=this.goals.length;
    this._data.changeGoal(this.goals);
    this.LoadData();
  }

  addItem()
  {
    this.goals.push(this.goalText);
    this.goalText='';
    this.itemCount=this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i)
  {
    this.goals.splice(i,1);
    this.itemCount=this.goals.length;
    this._data.changeGoal(this.goals);
  }

  deleteEmployee(id)
  {
    this.blockUI.start("wating...");
    
    this._data.deleteEmployee(this.selectedPage,this.pageSize,id)
    .subscribe(res=>{this.employees=res.Data,this.total=res.Total},
          error=>{console.log(error.message)});
   
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
    }, 20000);
  }

  LoadPage(page:number)
  {
    if(page!=this.previousPage)
    {
      this.previousPage=this.selectedPage=page;
      this.LoadData();     
    }
  }

  LoadData()
  {
    this._data.getEmployee(this.selectedPage,this.pageSize)
    .subscribe(res=>{this.employees=res.Data, this.total=res.Total},
      error=>{console.log(error.message)});
  }


}
