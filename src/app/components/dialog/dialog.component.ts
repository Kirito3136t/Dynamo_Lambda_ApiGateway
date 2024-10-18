import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{
    employeeForm=new FormGroup({
      full_name:new FormControl(null,Validators.required),
      job_title:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      Salary:new FormControl(null,Validators.required)
    })

    jobTitles:any;

    constructor(
      private employeeService:EmployeeService,
      @Inject(MAT_DIALOG_DATA) public data:any,
      private snackBar: MatSnackBar,
      private dialogRef:MatDialogRef<DialogComponent>
    ){
      if(data!=undefined){
        this.employeeForm.setValue({
          full_name:data.full_name,
          job_title:data.job_title,
          email:data.email,
          Salary:data.Salary
        })
      }
    }

  ngOnInit(): void {
    this.getJobTitles();
  }

  closeDialog(){
    this.dialogRef.close();
  }


    addEmployee(){
      this.employeeService.addEmployee(this.employeeForm.value).subscribe({
        next:(res:any)=>{
          this.closeDialog();
          this.snackBar.open("Successfully Created a new Employee", 'Close', {
            duration: 4000, 
          });
          window.location.reload();
        },
        error:(err:any)=>{
          console.log();
          this.snackBar.open(err.error, 'Close', {
            duration: 4000, 
          });
        }
      });
    }

    editEmployee(){

      let updatedEmployee:any={};

      if(this.employeeForm['controls'].email.value!=this.data.email){
        updatedEmployee={
          employeeId:this.data.employeeid,
          updateKey:"email",
          updateValue:this.employeeForm.controls['email'].value
        }
      }else if(this.employeeForm['controls'].full_name.value!=this.data.full_name){
        updatedEmployee={
          employeeId:this.data.employeeid,
          updateKey:"full_name",
          updateValue:this.employeeForm.controls['full_name'].value
        }
      }else{
        updatedEmployee={
          employeeId:this.data.employeeid,
          updateKey:"Salary",
          updateValue:Number(this.employeeForm.controls['Salary'].value)
        }
      }

      this.employeeService.editEmployee(updatedEmployee).subscribe({
        next:(res:any)=>{
          this.closeDialog();
          window.location.reload();
          this.snackBar.open("Successfully update the employee details", 'Close', {
            duration: 4000, 
          });
        },
        error:(err:any)=>{
          console.log();
          this.snackBar.open(err.error, 'Close', {
            duration: 4000, 
          });
        }
      })
    }

    getJobTitles(){
      this.employeeService.getJobTitles().subscribe({
        next:(res:any)=>{
          this.jobTitles=res.job_titles;
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
}
