import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {QualificationCardComponent} from "./components/qualification-card/qualification-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, QualificationCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Employee Service';
  protected readonly window = window;
}
