import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {RestService} from "../../services/rest-service";
import {DataService} from "../../services/data-service";
import {resolve} from "@angular/compiler-cli";
import {Qualification} from "../../qualification";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {

  public addNewText = "Duschen";

  constructor(public restService: RestService, public dataService: DataService) {
    restService.fetchQualificationData();
  }

  public add() {
    // TODO: error message
    if (this.addNewText.length == 0) {
      console.log("error: name cannot be empty")
      return;
    }
    if (this.dataService.qualifications.filter(q => q.skill!.toLowerCase() == this.addNewText.toLowerCase()).length >= 1) {
      console.log("error: name already exists")
      return;
    }
    this.restService.addQualification(this.addNewText);
    this.addNewText = "";
  }

  public delete(qualification: Qualification) {
    this.restService.deleteQualification(qualification.id!);
  }

  public edit(qualification: Qualification) {
    // TODO: error message
    if (this.dataService.qualificationEdit !== undefined) {
      console.log("You are editing something")
      return;
    }
    this.dataService.qualificationEdit = { name: qualification.skill!, id: qualification.id! };
  }

  public save() {
    this.dataService.qualifications.filter(q => q.id == this.dataService.qualificationEdit?.id).forEach(q => {
      let name = this.dataService.qualificationEdit!.name;
      if (name != q.skill) {
        this.restService.editQualification(q.id!, name);
      }
    });
    this.dataService.qualificationEdit = undefined;
  }

  public close() {
    this.dataService.qualificationListDialog = false;
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
