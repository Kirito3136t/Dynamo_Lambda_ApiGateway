import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getEmployees(){
    return this.http.get("/employees");
  }

  getEmployee(id:string){
    const params = new HttpParams().set('employeeid', id);
    return this.http.get("/employee",{params});
  }

  addEmployee(obj:any){
    return this.http.post("/employee",obj);
  }

  deleteEmployee(id:string){
    const params = new HttpParams().set('employeeid', id);
    
    return this.http.delete("/employee",{ params });
  }

  editEmployee(obj:any){
    return this.http.put("/employee",obj);
  }

  getJobTitles(){
    return this.http.get("/job_titles");
  }

  downloadCSV():Observable<Blob>{
    return this.http.get("/download",{responseType:'blob'})
  }


}
