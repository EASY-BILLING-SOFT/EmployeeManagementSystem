import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  imports: [MatTableModule,MatCardModule,MatButtonModule],
  selector: 'app-table',
  styleUrl: './table.scss',
  templateUrl: './table.html',
})
export class Table {
  @Input() data: any[]=[];
  @Input() displayedColumns: any[]=[];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  edit(rowData:any){
    this.onEdit.emit(rowData);
  }
  
  delete(rowData:any){
    this.onDelete.emit(rowData);
  }
}
