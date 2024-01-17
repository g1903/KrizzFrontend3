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
  bearer : string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU1MzA3NTYsImlhdCI6MTcwNTUyNzE1NiwianRpIjoiMTliNTFhZjItM2EwMC00MjI1LTlmNTYtOWEzZjhjOWY0MzM5IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJhMDFhMjQxOS1mYmQ2LTQ3ZGQtYjY3YS04ODliMGIxMjJhMzkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.RHRifKT_B8nYB70A4QCUVZ1T-YnVt2lwWMc3DozCjr9u8VoZ3hVc56fpbgapVrQtxx5leK1dvzrS9Bj9PICmSCc27NboPAjYTX9j-xjlK4gJ9y0pm8cI35hJiXoYT69XZHFv3SUyebRvGNM6qNf5LvTZ39XcP6oZ4SyC_0p9su3Hq7WgZ5QhJM0bw0izQqsJUF1Ev9W2PWqanm_wExYJUQMpjKzrjWCpE1lrPwRjYtgMexHV4WVCXkdV2x85i61ZjDjcl3fN5ihjR8q-zQjK7GB8fTjloVm798zrMN7TvOXqpU-9lQPPBtjkrUNmTsd4-IZ1IQZMeSVMQjMbvdhStw";
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
