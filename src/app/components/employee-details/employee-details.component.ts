import {Component, HostListener, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Employee} from "../../Employee";
import {EmployeeInitialsComponent} from "../employee-initials/employee-initials.component";
import {QualificationCardComponent} from "../qualification-card/qualification-card.component";
import {RestService} from "../../services/RestService";
import {Data} from "@angular/router";
import {DataService} from "../../services/data-service";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent, QualificationCardComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {

  @Input() public employee: Employee | undefined;
  public skills: string[] = [];

  constructor(public restService: RestService, private dataService: DataService) {
    restService.fetchQualificationsForEmployee(26).subscribe(e => console.log(e.skillSet?.forEach(ee => this.skills.push(ee.skill))));
  }

  public close() {
    this.dataService.employeeDetails = undefined;
  }
}
