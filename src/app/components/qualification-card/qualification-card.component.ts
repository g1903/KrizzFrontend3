import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Qualification} from "../../qualification";
import {RestService} from "../../services/RestService";
import {Observable, of} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-qualification-card',
  standalone: true,
  imports: [CommonModule, RestService],
  templateUrl: './qualification-card.component.html',
  styleUrl: './qualification-card.component.css'
})
export class QualificationCardComponent {

  @Input() public selectable: boolean = false;
  @Input() public qualifications: string[] | undefined;

  constructor(public restService: RestService) {
  }
}
