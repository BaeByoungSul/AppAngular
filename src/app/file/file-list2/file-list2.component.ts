import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-file-list2',
  templateUrl: './file-list2.component.html',
  styleUrls: ['./file-list2.component.css']
})
export class FileList2Component implements AfterViewInit {
  @Output() outputSelection = new EventEmitter<any>();

  displayedColumns: string[] = ['select', 'fileName', 'size'];
  displayedColumns2: string[] = ['파일명', '크기'];
  
  //dataSource = new MatTableDataSource<{fileName: string; size: string;}>([]);
  @Input() dataSource = new MatTableDataSource<{fileName: string; size: string;}>([]);
  selection = new SelectionModel<{fileName: string; size: string;}>(true, []);
  @ViewChild('paginator') paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
     
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  masterToggle() {
    console.log('masterToggle');
    
    this.isAllSelected() ?  this.selection.clear() :  
                    this.dataSource.data.forEach(row => this.selection.select(row));
    
    this.outputSelection.emit(this.selection);                
  }
  rowToggle( row:{fileName: string; size: string;}){
    this.selection.toggle(row)
    this.outputSelection.emit(this.selection);                
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
}
