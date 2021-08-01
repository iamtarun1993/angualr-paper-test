import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { from, noop, Observable, of } from 'rxjs';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private employeeService: EmployeeService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  title = 'angular-paper-test';
  employees: Employee[] = [];
  isDataAvailable: boolean = true;
  departmentsWithCount: {name: string, count: number}[] = []


  ngOnInit() {
    this.reset()
  }

  sortByJoiningDt() {
    this.isDataAvailable = false;
    this.employees = this.employees.sort(function(first, second) {
      return new Date(first.joining_dt).getTime() - new Date(second.joining_dt).getTime()
    });
    this.changeDetectorRef.detectChanges();
    this.isDataAvailable = true;
  }

  sortByName() {
    this.isDataAvailable = false;
    this.employees = this.employees.sort(function(first, second) {
      return (first.name.toLowerCase() < second.name.toLowerCase()) ? -1 : 1;
    });
    this.changeDetectorRef.detectChanges();
    this.isDataAvailable = true;
  }

  expMoreThan(experienceYear: number) {
    this.isDataAvailable = false;

    this.employees = this.employees.filter(employee => {
      return (new Date().getTime() - new Date(employee.joining_dt).getTime()) / (60 * 60 * 24 * 1000 * 365) > experienceYear;
    })

    this.changeDetectorRef.detectChanges();
    this.isDataAvailable = true;
  }

  removeCandidatesFromParticularDepartment(deparment: string) {
    this.isDataAvailable = false;

    this.employees = this.employees.filter(employee => {
      return employee.department.toLowerCase() !== deparment.toLowerCase();
    })

    this.changeDetectorRef.detectChanges();
    this.isDataAvailable = true;
  }

  getDepartmentWiseCount() {
    this.departmentsWithCount = [];

    let departments = this.employees.map(employee => employee.department);
    let uniquieDepartments = departments.filter((department, index) => departments.indexOf(department) === index);

    uniquieDepartments.forEach(uniquieDepartment => {
      let count = 0;
      departments.forEach(dept => {
        if (dept === uniquieDepartment) {
          count += 1;
        }
      })
      let deptCount = {
        name: uniquieDepartment,
        count
      }
      this.departmentsWithCount.push(deptCount)
    })
  }

  reset() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employees = res;
      this.getDepartmentWiseCount();
    })
  }


  
}
