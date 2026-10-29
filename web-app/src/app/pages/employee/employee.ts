import { Component, inject } from '@angular/core';
import { Http } from '../../services/http';
import { Table } from '../../components/table/table';
import { IEmployee } from '../../types/employee';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { EmployeeForm } from './employee-form/employee-form';

@Component({
  imports: [Table,MatButtonModule],
  selector: 'app-employee',
  styleUrl: './employee.scss',
  templateUrl: './employee.html',
})
export class Employee {
  readonly dialog = inject(MatDialog);
  httpService = inject(Http);
  employeeList: IEmployee[]=[];
  showCols = ['id','name','email','phone','action']
  getLatestData(){
      this.httpService.getEmployeeList().subscribe((result)=>{
      this.employeeList=result;
    });
  }
  ngOnInit(){
    this.getLatestData();
  }
  edit(employee:IEmployee){
    let ref = this.dialog.open(EmployeeForm, {
      panelClass:'m-auto',
      data:{
        employeeId: employee.id,
      },
    });
    ref.afterClosed().subscribe((result)=>{
      this.getLatestData();
    });   
  }
  delete(employee:IEmployee){
    this.httpService.deleteEmployee(employee.id).subscribe(()=>{
      alert("Record Deleted");
      this.getLatestData();
    })
  }
  add(){
    this.openDialog();
  }
  openDialog(): void {
    let ref = this.dialog.open(EmployeeForm, {
      panelClass:'m-auto',
      data:{}
    });
    ref.afterClosed().subscribe((result)=>{
      this.getLatestData();
    });
  }

}
