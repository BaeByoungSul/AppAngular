import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginatorModule,MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';


@Component({
  selector: 'app-file-list1',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule    
  ],
  templateUrl: './file-list1.component.html',
  styleUrl: './file-list1.component.css'
})
export class FileList1Component implements AfterViewInit, OnChanges  {
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  @Output() outputSelection = new EventEmitter<any>();

  displayedColumns: string[] = ['select', 'fileName', 'fileSize'];
  displayedColumns2: string[] = ['파일명', '크기'];
  @Input() dataSource = new MatTableDataSource<{fileName: string; fileSize: string;}>([]);
  selection = new SelectionModel<{fileName: string; fileSize: string;}>(true, []);
  @ViewChild('paginator') paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
    
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  masterToggle() {
    console.log('masterToggle');
    
    this.isAllSelected() ?  this.selection.clear() :  
                    this.dataSource.data.forEach(row => this.selection.select(row));
    
    this.outputSelection.emit(this.selection);                
  }
  rowToggle( row:{fileName: string; fileSize: string;}){
    this.selection.toggle(row)
    this.outputSelection.emit(this.selection);                
  }
  isAllSelected() {
    // console.log('isAllSelected');
    
    // console.log(this.selection.selected);
    // console.log(this.dataSource.data);
    // return false
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
}
