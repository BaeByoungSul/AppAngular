import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements AfterViewInit {
  displayedColumns: string[] = ['fileName', 'size'];
  displayedColumns2: string[] = ['파일명', '크기'];
  
  @Input() message = ''; // decorate the property with @Input()
  
  @Input() dataSource = new MatTableDataSource<{fileName: string; size: string;}>([]);
  @ViewChild('paginator') paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}
