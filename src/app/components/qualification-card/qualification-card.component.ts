import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Qualification} from "../../qualification";
import {RestService} from "../../services/RestService";

@Component({
  selector: 'app-qualification-card',
  standalone: true,
  imports: [CommonModule, RestService],
  templateUrl: './qualification-card.component.html',
  styleUrl: './qualification-card.component.css'
})
export class QualificationCardComponent {

  @Input() public selectable: boolean = false;

  constructor(public restService: RestService) {
  }
}
