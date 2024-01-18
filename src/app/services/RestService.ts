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
  bearer : string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU1ODY2OTQsImlhdCI6MTcwNTU4MzA5NCwianRpIjoiODRlZDk4ZjYtZjFhZi00YmQ3LWI1NjEtMzA4YWU1NDExNTYyIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI3NmU3ZjRkNS1kZmRlLTRjM2ItOWI5MC0wMmRjODA3MGU5MTAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.YXY2vVFSTWyGm19lb41bwI1n_vCX-aB8x6_mZlXB1Tp2j5ZwwowpZ0vZQygmy_BsR9dj-zruP3IHx7dzDqIzJQXhdo9IlMQh-u2cCQvcBfpzDGM8De65Z9AnKLyfklrwCDgLyDXRWJ3_FS-P1GrA6LzWdPgXKucVhBxL7Vcaf6YEsBFTqzr5Bk9nmSTk2bK2ErKhfz1fQqYtz4vAlR9RlBqAh0s-s1JtxdYkGGlA5oYY4EwJpZ3cH39uysA3o6c5a9boTATHswp4gAXe2DFgnWszKfzYHyOVpN-QVOsaliQmTVW10uvlmuLsNpbGcEYj8Bhyc-oKVljtR2yL50yfAw";
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
