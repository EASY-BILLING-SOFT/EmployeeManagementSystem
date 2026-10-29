import { Component, inject } from '@angular/core';
import { Http } from '../../services/http';
import { IDepartment } from '../../types/department';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  selector: 'app-departments',
  styleUrl: './departments.scss',
  templateUrl: './departments.html',
})
export class Departments {
  httpService = inject(Http);
  departments:IDepartment[]=[];
  isFormOpen=false;
  editId = 0;

  ngOnInit(){
    this.getLatestData();
  }

  getLatestData(){
    this.httpService.getDetpartments().subscribe((result)=>{
      this.departments=result;
    });
  }

  departmentName!:string;
  addDepartment(){
    this.httpService.addDepartment(this.departmentName).subscribe(()=>{
      alert("Record Saved");
      this.isFormOpen=false;
      this.getLatestData();
    });
  }

  editDepartment(department: IDepartment){
    this.departmentName = department.name;
    this.isFormOpen=true;
    this.editId=department.id;
    console.log('Edit Department' + this.editId);
    
  }

  updateDepartment(){
    this.httpService.updateDepartment(this.editId,this.departmentName).subscribe(()=>{
      alert("Record Updated");
      this.isFormOpen=false;
      this.getLatestData();
      this.editId=0;
    });    
  }

  delete(id:number){
    this.httpService.deleteDepartment(id).subscribe(()=>{
      alert("Record Deleted");
      this.getLatestData();
    });    
  }
}
