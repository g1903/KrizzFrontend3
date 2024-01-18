import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {QualificationCardComponent} from "./components/qualification-card/qualification-card.component";
import {RestService} from "./services/RestService";
import {QualificationListComponent} from "./components/qualification-list/qualification-list.component";
import {AddQualificationComponent} from "./components/add-qualification/add-qualification.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, QualificationCardComponent, RestService, QualificationListComponent, AddQualificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Employee Service';
  protected readonly window = window;

  constructor(public restService: RestService) {
  }
}
