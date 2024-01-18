import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from "../../Employee";
import { EmployeeInitialsComponent } from "../employee-initials/employee-initials.component";
import { EmployeeCardComponent } from "../employee-card/employee-card.component";
import {RestService} from "../../services/RestService";
import {DefaultPopupComponent} from "../default-popup/default-popup.component";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {QualificationListComponent} from "../qualification-list/qualification-list.component";
import {Data} from "@angular/router";
import {DataService} from "../../services/data-service";
import {last} from "rxjs";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent, MatDialogModule, EmployeeCardComponent, RestService, DefaultPopupComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: Employee[] = [];

  constructor(public restService: RestService, public dataService: DataService) {
    restService.employees$.forEach(e => e.forEach(ee => this.employees.push(new Employee(ee.id, ee.lastName, ee.firstName, ee.street, ee.postcode, ee.city, ee.phone))));
    this.employees = this.employees.sort((a,b) => b.employeeFullName().localeCompare(a.employeeFullName()));
  }

  getGoodWidth() {
    let cardWidth= 170;
    return ((window.innerWidth / cardWidth) | 0) * cardWidth;
  }

  public click(employee: Employee) {
    console.log(employee.firstName);
    this.dataService.employeeDetails = employee;
  }


  selectedEmployee: any;

  openEmployeeForm(employee: any) {
    this.selectedEmployee = employee;
  }

  closeEmployeeForm() {
    this.selectedEmployee = null;
  }
}
