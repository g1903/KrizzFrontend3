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
  bearer : string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU1ODIzMjgsImlhdCI6MTcwNTU3ODcyOCwianRpIjoiMDAzNjY3ZWYtNTgwYy00YmUyLWEwN2QtMjRmNTY1ZGM0MTVkIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI5OTkwMDIzZi02YTU4LTQ0MTMtYWE1MS04NzE1ODQ0MzdlNGYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.c9ApGTXgMJCqlBSCZphh34dwDhOgFTCmTVL3Xjs0GXrgFQooIgeYsWEwlcYovwoZgEATcRJy0_WcUt8AdWe9rljROUM3ZLjjFUsSj-EsptwFO0127CYnpiWbXqT8JYxYwyV7Rks-geuFAgxVp6Q3f-X47sZaob0AQKL3nPI_khZzVQjdaoEeooAEPfT96BNCrfCJFIFVESWqnmZzHVKqgUFSVg-iPwoM0LSHLv8RVmsYwyj5EceOa_IzV4F9XAfUs15L2ubB99dRhS-2f-HIfwGNLDXHLcnljgBqInzIM-onOEOm06qmMtLYJXfnlebt8Nqf9V13uEiVF7fElv9Vng";
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
