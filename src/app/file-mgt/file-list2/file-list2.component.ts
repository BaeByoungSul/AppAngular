import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 12, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 13, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 14, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 15, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 16, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 17, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 18, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 19, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 20, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 21, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 22, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 23, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 24, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 25, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 26, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 27, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 28, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-file-list2',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, 
    MatPaginatorModule,
    MatProgressBarModule,
    MatCheckboxModule
  ],
  templateUrl: './file-list2.component.html',
  styleUrl: './file-list2.component.css'
})
export class FileList2Component implements AfterViewInit, OnChanges{

  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  @Input() dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

 ngOnInit() {
//    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    this.dataSource?.data.forEach((dir)=>{
      console.log(dir);
      
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s.name));
  }
}
