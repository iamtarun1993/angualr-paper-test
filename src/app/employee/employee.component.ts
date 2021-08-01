import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'department', 'joining_dt'];

  constructor() { }

  @Input() employees: Employee[] = [];

  ngOnInit(): void {
  }

}
