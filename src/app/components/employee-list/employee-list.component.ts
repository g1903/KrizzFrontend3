import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from "../../Employee";
import { EmployeeInitialsComponent } from "../employee-initials/employee-initials.component";
import { EmployeeCardComponent } from "../employee-card/employee-card.component";
import {RestService} from "../../services/RestService";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent, EmployeeCardComponent, RestService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(public restService: RestService) {
  }

  getGoodWidth() {
    let cardWidth= 170;
    return ((window.innerWidth / cardWidth) | 0) * cardWidth;
  }

  public click(employee: Employee) {
    console.log(employee.firstName)
  }
}
