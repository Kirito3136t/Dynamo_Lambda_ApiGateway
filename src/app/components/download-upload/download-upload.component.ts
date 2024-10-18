import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-download-upload',
  templateUrl: './download-upload.component.html',
  styleUrls: ['./download-upload.component.css']
})
export class DownloadUploadComponent {
  constructor(private employeeService:EmployeeService,
    private snackBar: MatSnackBar,
    private http:HttpClient
  ){

  }

  downloadCsvButton(){
    this.employeeService.downloadCSV().subscribe({
      next:(blob:any)=>{
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv'; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); 
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  onSelectFile(e:any){
    if(e.target.files){
      const file = e.target.files[0];
      var reader = new FileReader();
      // reader.readAsDataURL(e.target.files[0]);
      // reader.onload=(event:any)=>{
      //   const base64File = btoa(event.target.result);
      //   this.uploadFile(base64File, file.name);
      // }  
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix if needed
        const base64File = base64String.split(',')[1];
        this.uploadFile(base64File, file.name);
      };
   
      reader.readAsDataURL(file); // Read as Data URL    
    }
  }

  uploadFile(base64File: string, fileName: string) {
    const apiUrl = 'https://czq8apsskc.execute-api.eu-north-1.amazonaws.com/production/upload'; // Replace with your API Gateway URL
    const payload = {
      file: base64File,
      name: fileName,
    };
 
    this.http.post(apiUrl, payload).subscribe(
      (response) => {
        this.snackBar.open('File uploaded successfully!', 'Close', {
          duration: 6000,
        });
        this.snackBar.open(fileName + " has been uploaded", 'Close', {
          duration: 6000, 
        });
      },
      (error) => {
        console.error('Upload failed:', error);
        this.snackBar.open('File upload failed!', 'Close', {
          duration: 6000,
        });
      }
    );
  }

}
