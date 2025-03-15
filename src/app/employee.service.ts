import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment';
import { HttpClient} from '@angular/common/http';
import { Designation, Employee, Roles } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  addEmployee(employeeObj:any):Observable<any>{
    return this.http.post<any>(`${environment.createNewEmployee}`, employeeObj);
  }

  viewEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${environment.getAllEmployee}`);
  }

  getRoles():Observable<Roles[]>{
    return this.http.get<Roles[]>(`${environment.getAllRoles}`);
  }

  getDesignation():Observable<Designation[]>{
    return this.http.get<Designation[]>(`${environment.GetAllDesignation}`);
  }

  updateEmployee(employeeObj: any):Observable<any>{
    return this.http.put<any>(`${environment.updateEmployee}`, employeeObj);
  }

  getEmployeeById(id:number):Observable<any>{
    return this.http.get<any>(`${environment.getEmployeeByEmpId}`+id)
  }

  deleteEmployeeByEmpId(id:number):Observable<any>{
    return this.http.delete(`${environment.deleteEmployeeByEmpId}`+id)
  }
}


// id is static-- fixed won't change Value
// like logo
// If we process with api it is dynamic
