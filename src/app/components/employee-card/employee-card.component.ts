import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeInitialsComponent} from "../employee-initials/employee-initials.component";
import {Employee} from "../../Employee";

@Component({
  selector: 'app-employee-card',
  standalone: true,
    imports: [CommonModule, EmployeeInitialsComponent],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {

  @Input() public employee: Employee | undefined;

  public employeeFullName(employee: Employee): string  {
    let s = employee.firstName + " " + employee.lastName;
    if (s.length >= 28) {
      return s.substring(0, 27) + "...";
    }
    return s;
  }
}
