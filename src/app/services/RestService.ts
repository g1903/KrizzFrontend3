import {Injectable, NgModule} from "@angular/core";
import {Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {Qualification} from "../qualification";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ HttpClientModule ]
})
@Injectable({ providedIn: "root" })
export class RestService {
  bearer : string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU1Njk2NTMsImlhdCI6MTcwNTU2NjA1MywianRpIjoiODNkOTdhZDItY2YzYi00NDFkLTkyMWQtNjgxNDEzOWRhNWIxIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI3YzYzYmY3ZC01MzZlLTRiZWQtOTY3ZS1lZDlhMDE3NTUwYjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.GcoTP1T05m9JUUK7rdgRbbdkTYsP-aIr67RWNRj0u2wGTii4RVT1ibA8eQPnu9a-pXYXoi_fSk5LpAUcjUOxPAdXFFBSwMS194WaxiFecBvaY8AubDOzmGtH_x5pixJOG5X4xnO4lTcSOBbUXvfSbyw5vFzGSQBP880naKFYgK0itHJSUdDaX20u9pKNT7zMg_1TGKT_2bLYIkQ9picDUTIxsBo8RmByHkmsXNNWZWmK2okCODVR-yAPmkjd_yBQ6C5O73RkfUsIoakR0oNNRHWomOBmXetZmDRoOYTqTh4NEQg2lKrbkQq3LjdtQaJhcd7BGPXiOlWoYKppR8mP7g";
  employees$: Observable<Employee[]>;
  qualifications$: Observable<Qualification[]>;

  constructor(private http: HttpClient) {
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
}
