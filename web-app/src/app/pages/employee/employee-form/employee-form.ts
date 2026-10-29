import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { Http } from '../../../services/http';
import { IDepartment } from '../../../types/department';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employee';
@Component({
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule
  ],
  selector: 'app-employee-form',
  styleUrl: './employee-form.scss',
  templateUrl: './employee-form.html',
})
export class EmployeeForm {

  fb = inject(FormBuilder);
  httpService = inject(Http);
  departments:IDepartment[]=[]; 
  @Input() employeeId!:number;
  
  employeeForm = this.fb.group({
      id:[0],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      gender: [1, Validators.required],
      departmentId : ['', [Validators.required]],
      jobTitle: ['',[Validators.required]],
      joiningDate:[null,[Validators.required]],
      lastWorkingDate:[],
      dateOfBirth:[null,[Validators.required]],
    });

  ngOnInit(){
    this.httpService.getDetpartments().subscribe(result=>{
      this.departments = result;
    });
    console.log("here ",this.data);
    
    if(this.data.employeeId){
      this.httpService.getEmployeeById(this.data.employeeId).subscribe(result=>{
        console.log(result);
        this.employeeForm.patchValue(result as any);
        this.employeeForm.get('gender')?.disable();
        this.employeeForm.get('joiningDate')?.disable();
        this.employeeForm.get('dateOfBirth')?.disable();
      })
    }
  }
  dialogRef=inject(MatDialogRef<EmployeeForm>);
  data = inject<EmployeeForm>(MAT_DIALOG_DATA);
  onSubmit(): void {
  if(this.data.employeeId){
      let value:any=this.employeeForm.value;
      this.httpService.updateEmployee(this.data.employeeId,value).subscribe(()=>{
        alert("Record Updated");
        this.dialogRef.close();
      });
    }else{
      let value:any=this.employeeForm.value;
      this.httpService.addEmployee(value).subscribe(()=>{
        alert("Record Saved");
        this.dialogRef.close();
      });
    }    
  }

  onReset(): void {
  }
}

