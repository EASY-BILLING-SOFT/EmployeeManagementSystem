import { HttpClient } from '@angular/common/http';
import { inject, Injectable,Service } from '@angular/core';
import { IDepartment } from '../types/department';
import { IEmployee } from '../types/employee';
import { environment } from '../../environments/environment';

//@Service()
@Injectable({
    providedIn:'root'
})

export class Http {
    http = inject(HttpClient);


    getDetpartments(){
        return this.http.get<IDepartment[]>(environment.apiUrl + '/api/Department');
    }
    addDepartment(name:string){
        return this.http.post(environment.apiUrl + '/api/Department',{
            name:name,
        });
    }
    updateDepartment(id:number,name:string){
        return this.http.put(environment.apiUrl + '/api/Department/' + id, {
            name:name,
        });
    }
    deleteDepartment(id:number){
        return this.http.delete(environment.apiUrl + '/api/Department/' + id);
    }     
    
    getEmployeeList(){
        return this.http.get<IEmployee[]>(environment.apiUrl + "/api/Employee");
    }
    addEmployee(employee:IEmployee){
        return this.http.post(environment.apiUrl + "/api/employee",employee);
    }
    getEmployeeById(id:number){
        return this.http.get<IEmployee>(environment.apiUrl + '/api/employee/' + id)
    }
    updateEmployee(id:number,employee:IEmployee){
        return this.http.put(environment.apiUrl + "/api/employee/"+id,employee);
    }
    deleteEmployee(id:number){
        return this.http.delete(environment.apiUrl + '/api/employee/' + id)
    }        
}
