import {Employee} from "../Employee";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root" })
export class DataService {
  public createQualificationDialog = false;
  public employeeDetails: Employee | undefined;
  public qualificationListDialog = false;

}
