import {Employee} from "../Employee";
import {Injectable} from "@angular/core";
import {Qualification} from "../qualification";

@Injectable({ providedIn: "root" })
export class DataService {

  public employees: Employee[] = [];
  public qualifications: Qualification[] = [];

  public createQualificationDialog = false;
  public employeeDetails: Employee | undefined;
  public qualificationListDialog = false;
  public qualificationEdit: {name: string, id: number} | undefined;
}
