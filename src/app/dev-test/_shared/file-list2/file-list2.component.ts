
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-file-list2',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule    
  ],
  templateUrl: './file-list2.component.html',
  styleUrl: './file-list2.component.css'
})
export class FileList2Component implements AfterViewInit {

  @Output() outputSelection = new EventEmitter<any>();

  displayedColumns: string[] = ['fileName', 'fileSize'];
  displayedColumns2: string[] = ['파일명', '크기'];
  @Input() dataSource = new MatTableDataSource<{fileName: string; fileSize: string;}>([]);
  selection = new SelectionModel<{fileName: string; fileSize: string;}>(true, []);
  @ViewChild('paginator') paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
