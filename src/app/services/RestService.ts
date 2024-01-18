import {Injectable, NgModule} from "@angular/core";
import {Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {Qualification} from "../qualification";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {EmployeeQualification} from "../employee-qualification";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ HttpClientModule ]
})
@Injectable({ providedIn: "root" })
export class RestService {
  bearer : string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU1ODI5ODUsImlhdCI6MTcwNTU3OTM4NSwianRpIjoiOGI4ZTYwNDAtMmQ2Yy00ZjMxLWJjMzUtNjU5YzU0ZTg2YjQwIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJmODdhYTM5Yy0zNjNiLTRiMzctOWQ0My0yNjc5YjhmZDA4NTYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.VnqxZ1yyTgg21GmRMVEftvrlBRAlImqcFPNn02mGivH-eI4fuedf-ooQ8IWrsBcdnOzIqdXTZa6AAXw6tqYX_k06l6E8cDKLJI1cl-ZoLmESn_sRHmtGoa_xyHB66zEWN-Vi_RKAPZPDOKk5M4QZ0rfw4xArj_MiPKIwQAk3FMLJHSSIrilkO_HqeG45R1z20TWZRzruvf2QFtjR9T3ib8jTpLdRat2g8-_M7E5pVUtvL7JibtkOUIbtx1kCitymSzuL7sS8Zi_mf7gcR852dsWHmtSg_P70jfrUv8v_AfbItUO-nro1tw0KooSjqg_pCvYS3xXtZ_LaHjytKdvvgg";
  employees$: Observable<Employee[]>;
  qualifications$: Observable<Qualification[]>;

  constructor(public http: HttpClient) {
    this.employees$ = of([]);
    this.qualifications$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('https://employee.szut.dev/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
    this.qualifications$ = this.http.get<Qualification[]>('https://employee.szut.dev/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  public fetchQualificationsForEmployee(id: number) {
    return this.http.get<EmployeeQualification>('https://employee.szut.dev/employees/' + id + '/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}
