import {Component, HostListener, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Employee} from "../../Employee";
import {EmployeeInitialsComponent} from "../employee-initials/employee-initials.component";
import {QualificationCardComponent} from "../qualification-card/qualification-card.component";
import {RestService} from "../../services/rest-service";
import {Data} from "@angular/router";
import {DataService} from "../../services/data-service";
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent, QualificationCardComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {

  @Input() public employee: Employee | undefined;

  constructor(public restService: RestService, private dataService: DataService) {
    setTimeout(() => {
      while (this.employee === undefined) {}
      restService.fetchQualificationsForEmployee(this.employee!);
    });
  }

  public close() {
    this.dataService.employeeDetails = undefined;
  }

  clickInside = false;
  clickBackground() {
    if (!this.clickInside) {
      this.close();
    }
    this.clickInside = false;
  }
  clickForeground() {
    this.clickInside = true;
  }
}
