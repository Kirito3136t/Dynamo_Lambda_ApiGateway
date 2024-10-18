import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit{

  employees:any;
  jobTitles:any[]=[];

  constructor(
    private employeeService:EmployeeService,
    private dialog:MatDialog
  ){

  }

  ngOnInit(): void {
    this.getAllEmployees();
    this.getJobTitle();
  }

  getAllEmployees(){
    this.employeeService.getEmployees().subscribe({
      next:(res:any)=>{
        this.employees=res.employees;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  editEmployee(id:string){
    let employee:any;
    this.employeeService.getEmployee(id).subscribe({
      next:(res)=>{
        employee=res;
        this.dialog.open(DialogComponent,{
          data:employee
        }
      );
      }
    })
  }

  getJobTitle(){
    this.employeeService.getJobTitles().subscribe({
      next:(res:any)=>{
        this.jobTitles=res.job_titles
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  getJobTitleName(id: string): string {
    const title = this.jobTitles.find((title: any) => title.jobid === id);
    return title ? title.job_name : 'Unknown Job Title'; 
  }

  deleteEmployee(id:string){
    
    this.employeeService.deleteEmployee(id).subscribe({
      next:(res:any)=>{
        window.location.reload();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

}
