import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SnackbarService } from '../../_service/snackbar.service';

import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { InputDialogComponent } from '../../_shared/input-dialog/input-dialog.component';
import { ConfirmDialogComponent } from '../../_shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CdkMenuModule,
    MatMenuModule
    

  ],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent implements AfterViewInit {
  selectedRowIndex= -1;
  @Input() dataSource = new MatTableDataSource<{fileName: string; fileSize: string;}>([]);
  @ViewChild('paginator') paginator!: MatPaginator;
  
  @Output() fileDelete = new EventEmitter< {fileName: string}>();
  @Output() renameFile = new EventEmitter< {fileName: string, renameFile: string}>();
  
  displayedColumns: string[] = ['fileName', 'fileSize'];
  displayedColumns2: string[] = ['파일명', '크기'];
  @ViewChild(MatMenuTrigger)  contextMenu!: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(
    private dialog$: MatDialog,
    //private fileService$:FileApiService,
    private snackBar$ : SnackbarService
  ){}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  highlight(row:any){
    this.selectedRowIndex=row.id;
  }
  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();

    // console.log(item);
    // return;
    
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    
    this.contextMenu.menuData = { 'item': item };
    
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }


  deleteFile(sourceFile : {fileName: string; fileSize: string;}){
    console.log(sourceFile);
   
    const dialogRef = this.dialog$.open(ConfirmDialogComponent, {
      data: {dialogTitle: '확인', 
            confirmMessage: '해당 파일을 삭제하시겠습니까?',
            attribute1: sourceFile.fileName}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      
      if (res) {
        console.log(res);
        //this.addFolder(res)
        this.fileDelete.emit({fileName: sourceFile.fileName});
      }
    });
  }
  openRenameDialog(sourceFile: {fileName: string; fileSize: string;}) {
    // let dialogRef = this.dialog$.open(RenameDialogComponent);
    // dialogRef.afterClosed().subscribe(res => {
    //   if (res) {
    //     //element.name = res;
    //     //this.elementRenamed.emit(element);
    //   }
    // });
console.log(sourceFile);

    const dialogRef = this.dialog$.open(InputDialogComponent, {
      data: {dialogTitle: 'Rename File', 
              inputTitle: 'Rename File',
              attribute1: sourceFile.fileName}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    
      if (res) {
        console.log(res);
        this.renameFile.emit({fileName:sourceFile.fileName, renameFile: res});
      //this.renameFile(sourceFile, res)
      //this.addFolder(res)
      //this.folderAdded.emit({ name: res });
      }
    });    
  }
}
