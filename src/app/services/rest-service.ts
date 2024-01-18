import {Injectable, NgModule} from "@angular/core";
import {Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {Qualification} from "../qualification";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {EmployeeQualification} from "../employee-qualification";
import {DataService} from "./data-service";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ HttpClientModule ]
})
@Injectable({ providedIn: "root" })
export class RestService {
  bearer = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU2MDQ3MzEsImlhdCI6MTcwNTYwMTEzMSwianRpIjoiZjdjNGZjZWMtNzE3Zi00OWI0LTlkYjMtOGRkNTdkYTFlZTk3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIyODdiODI5Yi01ZDc0LTQ2YTktYjQ0OC1jN2NmZTJmMDU4NzkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.SxDKhy8x8iKdvFEBtfcGpvdMzroEglyyRUE5cxKx_ydDIeuxr0hSEvx4fpGUlZsktzMI_Aqro7CeBghJRQieVoqUAuxy4VgpQmo55uMldJib2OgRTrRziH1cpX8xmGzsDg4h9Bo7Ug8d50-eNgFom9pyTY5tceCeeQlk1DInnXZSsZQ3ViXqGeyjY52RB6Fea-dcBItBLaOm_xqmzk1InxIo_OcOUa77ouNHBn0cz--A6_l2rbuwYEpSQESrVjiSyCQUb9PSoZkRRujpf-Ql0a6AFJlC_XgVIlkJghccUOaH9JOADEzBzVcn0SHCsJ5ZdTnaM3V29MM7PhyYu72uaQ";
  employees$: Observable<Employee[]>;
  qualifications$: Observable<Qualification[]>;

  constructor(public http: HttpClient, public dataService: DataService) {
    this.employees$ = of([]);
    this.qualifications$ = of([]);
    this.fetchEmployeeData();
    this.fetchQualificationData();
  }

  fetchEmployeeData() {
    this.employees$ = this.http.get<Employee[]>('https://employee.szut.dev/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
    this.employees$.subscribe(data => {
      this.dataService.employees = data
        .map(employee => new Employee(employee.id, employee.lastName, employee.firstName, employee.street, employee.postcode, employee.city, employee.phone))
        .sort((e1,e2)=> e1.employeeFullName().localeCompare(e2.employeeFullName()));
    });
  }

  fetchQualificationData() {
    this.qualifications$ = this.http.get<Qualification[]>('https://employee.szut.dev/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
    this.qualifications$.subscribe(data => {
      this.dataService.qualifications = data
        .filter(q => q.skill !== undefined)
        .sort((a,b) => a.skill!.localeCompare(b.skill!)!);
    })
  }

  public fetchQualificationsForEmployee(employee: Employee) {
    this.http.get<EmployeeQualification>('https://employee.szut.dev/employees/' + employee.id + '/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    }).subscribe(employeeData => {
      let skills: string[] = employeeData.skillSet?.map(skill => skill.skill) || [];
      skills = skills.sort((a,b)=>a.localeCompare(b));
      employee.skills = skills;
    });
  }

  public addQualification(name: string) {
    this.http.post('https://employee.szut.dev/qualifications',
      `{"skill":"` + name + `"}`,
      { headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)}
    ).subscribe(data => {
      this.fetchQualificationData();
    });
  }

  public deleteQualification(id: number) {
    this.http.delete('https://employee.szut.dev/qualifications/' + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)}
    ).subscribe(data => {
      this.fetchQualificationData();
    });
  }

  public editQualification(id: number, name: string) {
    this.http.put('https://employee.szut.dev/qualifications/' + id,
      `{"skill":"` + name + `"}`,
      { headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.bearer}`)}
    ).subscribe(data => {
      this.fetchQualificationData();
    });
  }
}
