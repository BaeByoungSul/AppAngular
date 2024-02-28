import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CdkMenuModule } from '@angular/cdk/menu';

import { InputDialogComponent } from '../../_shared/input-dialog/input-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogComponent } from '../../_shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-dir-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatMenuModule,
    CdkMenuModule
  ],
  templateUrl: './dir-list.component.html',
  styleUrl: './dir-list.component.css'
})
export class DirListComponent implements OnChanges  {
  @Input() newFolderVisible: boolean = true;
  @Input() dirList: { dirName: string; updated: Date; }[] | undefined | null ;
  @Input() queryDirPath : string[] = [];

  @Output() navigateFolder = new EventEmitter<string[]>();
  @Output() folderAdd = new EventEmitter<{serverPath: string[], folderName:string}>();
  @Output() folderDelete = new EventEmitter<{serverPath: string[], folderName:string}>();

  constructor(
    private dialog$: MatDialog
    // private fileService$:FileApiService,
    // private snackBar$ : SnackbarService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.dirList?.forEach((dir)=>{
      console.log(dir);
      
    })
  }
  folderClick(selectIndex: number) {
    // 선택한 server folder array index 보다 큰 것은 꺼낸다.
    // k: pop할 개수 ( 끄집어낸다. )
    var k = this.queryDirPath.length - (selectIndex + 1);
    for (var j = 1; j <= k; j++) {
      this.queryDirPath.pop();
    }

    this.navigateFolder.emit(this.queryDirPath );



    console.log(this.queryDirPath);

    //this.queryInFolder(this.queryDirPath);
  }
  
  subfolderClick(eventFolder: any) {
    this.queryDirPath.push(eventFolder.dirName);
    this.navigateFolder.emit(this.queryDirPath );
    //this.queryInFolder(this.queryDirPath);
  }

  openNewFolderDialog() {
    // let dialogRef = this.dialog$.open(CreateFolderDialogComponent,
    //   data: {name: '1111', animal: 'dkdkd'}
    //   );
    const dialogRef = this.dialog$.open(InputDialogComponent, {
        data: {dialogTitle: 'Create a new folder', inputTitle: 'Folder Name'}
    });

    dialogRef.afterClosed().subscribe(res => {
      //console.log(res);
      
      if (res) {
        console.log("Ok");
        //this.addFolder(res)
        this.folderAdd.emit({ serverPath: this.queryDirPath,  folderName: res });
      }
    });
  }
  deleteFolder(sourceDir : { dirName: string; updated: Date; }){
    //console.log(sourceDir.dirName);

    
    const dialogRef = this.dialog$.open(ConfirmDialogComponent, {
      data: {dialogTitle: '확인', confirmMessage: '해당 폴더를 삭제하시겠습니까?'}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      
      if (res) {
        console.log(res);
        //this.addFolder(res)
        this.folderDelete.emit({ serverPath: this.queryDirPath,  folderName: sourceDir.dirName });
      }
    });
  }



}
