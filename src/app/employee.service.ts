import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  candidate_data=[ 
    {"id": 11, "name": "Ash", "department": "Finance","joining_date": '8/10/2016'},
    {"id": 12,"name": "John","department": "HR","joining_date": '18/1/2011'},
    { "id": 13, "name": "Zuri", "department": "Operations", "joining_date": '28/11/2019'},
    {"id": 14,  "name": "Vish",  "department": "Development",   "joining_date": '7/7/2017'},
    { "id": 15, "name": "Barry",  "department": "Operations", "joining_date": '19/8/2014'},
    {"id": 16,"name": "Ady",  "department": "Finance",  "joining_date": '5/10/2014'}, 
    { "id": 17,"name": "Gare","department": "Development",  "joining_date": '6/4/2014'},
    { "id": 18,  "name": "Hola",  "department": "Development",  "joining_date": '8/12/2010'}, 
    {"id": 19,  "name": "Ola",  "department": "HR",  "joining_date": '7/5/2011'},
    { "id": 20,  "name": "Kim",  "department": "Finance",  "joining_date": '20/10/2010'}
  ]


  getEmployees(): Observable<Employee[]> {
    let candidate_data = this.candidate_data.map(res => ({
      ...res,
      joining_dt: moment(res.joining_date, "DD/MM/YYYY").toDate()

    }))
    return of(candidate_data);
  }

}
