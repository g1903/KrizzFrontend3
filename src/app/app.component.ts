import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {QualificationCardComponent} from "./components/qualification-card/qualification-card.component";
import {RestService} from "./services/rest-service";
import {QualificationListComponent} from "./components/qualification-list/qualification-list.component";
import {AddQualificationComponent} from "./components/add-qualification/add-qualification.component";
import {EmployeeDetailsComponent} from "./components/employee-details/employee-details.component";
import {Employee} from "./Employee";
import {DataService} from "./services/data-service";
import {SearchBarComponent} from "./search-bar/search-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, QualificationCardComponent, RestService, QualificationListComponent, AddQualificationComponent, EmployeeDetailsComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Employee Service';
  protected readonly window = window;

  constructor(public restService: RestService, public dataService: DataService) {
  }
}
