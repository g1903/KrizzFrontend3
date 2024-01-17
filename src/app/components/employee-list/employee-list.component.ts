import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Employee} from "../../Employee";
import {EmployeeInitialsComponent} from "../employee-initials/employee-initials.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, EmployeeInitialsComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU1MDM2MzYsImlhdCI6MTcwNTUwMDAzNiwianRpIjoiYTMyZTdlYTEtZjViZS00MDI3LWJiOWMtMGNjNjRiODZlMTAxIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJkZjIwYjVmYi0zNGUxLTRhMDYtYTQ2ZS1iNjRmYWFlMjRlYjIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.UDOiZB3NT_p96ziFoG9ge8Sm0tBEfJWuVYLKMe0BAABw5ncuhVyWWuQGhaof0VK6HI__Javwp1Y4wAI8Gk6g9AflIw94gZvVi53KqIoTv7cU6Ml4klBKUJ-sTDAh01Iu17K0UdaWgbSr4uF7k2ebZSctWfsyXnsBCHwZzHnQb_yWJDwEiu4FRK91cnjfLApnaw9wVN0_lkvSGbUiIFOcCloobOxzm79Mu3OtAJbliDA_5abh5pzQ70DTuB9JYsQFIK2aBVCHHdwDpr-tVQdFvJegLl__s1v-cG_2v37CLbcSc4ZRWe2Z75Q5D2Jtwjn_cPznvXY-KvhVYQx1XCgCAQ';
  employees$: Observable<Employee[]>;

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
     this.employees$ = this.http.get<Employee[]>('https://employee.szut.dev/employees', {
       headers: new HttpHeaders()
         .set('Content-Type', 'application/json')
         .set('Authorization', `Bearer ${this.bearer}`)
     });
  }

  public employeeFullName(employee: Employee): string  {
    let s = employee.firstName + " " + employee.lastName;
    if (s.length >= 28) {
      return s.substring(0, 27) + "...";
    }
    return s;
  }

  public click(employee: Employee) {
    console.log(this.employeeFullName(employee))
  }
}
