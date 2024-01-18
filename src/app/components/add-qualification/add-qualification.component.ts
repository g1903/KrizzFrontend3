import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Data} from "@angular/router";
import {DataService} from "../../services/data-service";

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css'
})
export class AddQualificationComponent {

  public addQualification = "";

  constructor(public dataService: DataService) {
  }

  public close() {
    this.dataService.createQualificationDialog = false;
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
