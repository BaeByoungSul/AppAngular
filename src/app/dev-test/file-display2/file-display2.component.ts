import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { DevTestModule } from '../dev-test.module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileApiService } from '../../_service/file-api.service';
import { FileList1Component } from "../_shared/file-list1/file-list1.component";
import { FileList2Component } from "../_shared/file-list2/file-list2.component";
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../_shared/confirm-dialog/confirm-dialog.component';
import { InputDialogComponent } from '../../_shared/input-dialog/input-dialog.component';

@Component({
    selector: 'app-file-display2',
    standalone: true,
    templateUrl: './file-display2.component.html',
    styleUrl: './file-display2.component.css',
    imports: [
        CommonModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        DevTestModule,
        MatTabsModule,
        MatGridListModule,
        MatMenuModule,
        CdkMenuModule,
        FileList1Component,
        FileList2Component
    ]
})
export class FileDisplay2Component implements OnInit {
  serverfolders: string[] = [];
  listFolder: { dirName: string; updated: Date; }[] = [];
  dataSource = new MatTableDataSource<{fileName: string; fileSize: string;}>([]);
  dataSource2 = new MatTableDataSource<{fileName: string; fileSize: string;}>([]);
  
  selection = new SelectionModel<{fileName: string; fileSize: string;}>(true, []);
  @Output() folderAdded = new EventEmitter<{ name: string }>();

  constructor(
    public fileService$: FileApiService,
    private dialog$: MatDialog,
    private snackBar$ : MatSnackBar,
   // private subjectService$: SubjectService
  ){}

  ngOnInit(): void {

    let dirPath = ['']
    let params: HttpParams = new HttpParams();
    params = params.set('queryDirJoin', dirPath.join('?'))
    
    // this.http$.get(`${this._baseUrl}/api/File/QueryInFolder`,{
    //   params: params
    // }).subscribe( res =>{
    //   console.log(res);
      
    // })
    //this.subjectService$.setLoading(true);
    this.fileService$.queryInFolder(params)
    .subscribe({
      next: ( res : any) => {
        this.serverfolders = res["queryDirPath"] ?? [];
        this.listFolder = res["dirList"];
        this.dataSource.data = res["fileList"]
        this.dataSource2.data = res["fileList"]
        
        //this.subjectService$.setLoading( false );
      },
      error: err =>{
        console.log(err);
        this.openSnackBar(err.error, "Close");
        //this.subjectService$.setLoading( false );
      }
    });

      // .subscribe((res: any) => {
      //   console.log(123);
      //   console.log(res);
      //   this.serverfolders = res["queryDirPath"] ?? [];
      //   this.listFolder = res["dirList"];
      //   this.dataSource.data = res["fileList"]
      // })
  }

  folderClick(selectIndex: number) {
    // 선택한 server folder array index 보다 큰 것은 꺼낸다.
    // k: pop할 개수 ( 끄집어낸다. )
    var k = this.serverfolders.length - (selectIndex + 1);

    for (var j = 1; j <= k; j++) {
      this.serverfolders.pop();
    }

    console.log(this.serverfolders);

    this.queryInFolder(this.serverfolders);
  }
  subfolderClick(eventFolder: any) {
    this.serverfolders.push(eventFolder.dirName);
    this.queryInFolder(this.serverfolders);
  }

  queryInFolder(serverPath: string[]) {
console.log(serverPath);
    this.selection.clear()
    let params: HttpParams = new HttpParams();
    params = params.set('queryDirJoin', serverPath.join('?'))
    
    //this.subjectService$.setLoading(true);
    this.fileService$.queryInFolder(params)
    .subscribe({
      next: (res) =>{
        console.log(res);
        this.serverfolders = res["queryDirPath"] ?? [];
        this.listFolder = res["dirList"];
        this.dataSource.data = res["fileList"]
        this.dataSource2.data = res["fileList"]
        
      },
      error: (err) => {
        console.log(err);
        this.serverfolders.pop();
        this.openSnackBar(err.error, "Close");
      },
      complete: () => {
        //this.subjectService$.setLoading(false);
      }
    });
    // this.fileService$.queryInFolder(params)
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     this.serverfolders = res["queryDirPath"] ?? [];
    //     this.listFolder = res["dirList"];
    //     this.dataSource.data = res["fileList"]
    //   })
  }
  
  receiveSelection($event:any) {
    console.log('receiveSelection');
    this.selection = $event;
    console.log($event);
    //this.message = $event
  }

  openNewFolderDialog() {
    // let dialogRef = this.dialog$.open(CreateFolderDialogComponent,
    //   data: {name: '1111', animal: 'dkdkd'}
    //   );
    const dialogRef = this.dialog$.open(InputDialogComponent, {
        data: {dialogTitle: 'Create a new folder', inputTitle: 'Folder Name'}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      
      if (res) {
        console.log(res);
        this.addFolder(res)
        //this.folderAdded.emit({ name: res });
      }
    });
  }
  addFolder(folderName: string ) {
    console.log('addFolder');
    
    console.log(folderName);
    let params: HttpParams = new HttpParams();
    params = params.set('newFolder', folderName)
    params = params.set('serverDirJoin', this.serverfolders.join('?'))
    
    //this.subjectService$.setLoading(true);
    this.fileService$.createFolder(params)
    .subscribe({
      next: (res) =>{
        console.log(res);
        this.serverfolders = res["queryDirPath"] ?? [];
        this.listFolder = res["dirList"];
        this.dataSource.data = res["fileList"]
      },
      error: (err) => {
        console.log(err);
        this.openSnackBar(err.error, "Close");
      },
      complete: () => {
        //this.subjectService$.setLoading(false);
      }
    });


    //this.fileService$.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    //this.updateFileElementQuery();
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
      data: {dialogTitle: 'Rename File', inputTitle: 'File Name'}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    
      if (res) {
      console.log(res);
      this.renameFile(sourceFile, res)
      //this.addFolder(res)
      //this.folderAdded.emit({ name: res });
      }
    });    
  }
  renameFile(sourceFile:  {fileName: string; fileSize: string;}, fileName: string ) {
    //console.log('addFolder');
    
    console.log(fileName);
    let params: HttpParams = new HttpParams();
    params = params.set('queryDirJoin', this.serverfolders.join('?'))
    params = params.set('sourceFileName', sourceFile.fileName)
    params = params.set('moveFileName', fileName)
    
    
    this.fileService$.renameFile(params)
    .subscribe((res: any) => {
      console.log(res);

      //this.dataSource.data = res["fileNames"];
      this.serverfolders = res["queryDirPath"] ?? [];
      this.listFolder = res["dirList"];
      this.dataSource.data = res["fileList"]

      //this.getDirInfoEvent.emit(res);
      // this.selectedFolder = '';
      
    })
    //this.fileService$.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    //this.updateFileElementQuery();
  }
  deleteElement(sourceFile:  {fileName: string; fileSize: string;}) {
    console.log(sourceFile);
    const dialogRef = this.dialog$.open(ConfirmDialogComponent, {
      data: {dialogTitle: '확인', confirmMessage: '해당 파일을 삭제하시겠습니까?'}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    
      if (res) {
      console.log(res);
      this.deleteFile(sourceFile);
      //this.renameFile(sourceFile, res)
      //this.addFolder(res)
      //this.folderAdded.emit({ name: res });
      }
    }); 
    //this.elementRemoved.emit(element);
  }
  deleteFile(sourceFile:  {fileName: string; fileSize: string;}) {
    //console.log('addFolder');
    
    
    let params: HttpParams = new HttpParams();
    params = params.set('queryDirJoin', this.serverfolders.join('?'))
    params = params.set('sourceFileName', sourceFile.fileName)
    
    
    this.fileService$.deleteFile(params)
    .subscribe((res: any) => {
      console.log(res);

      //this.dataSource.data = res["fileNames"];
      this.serverfolders = res["queryDirPath"] ?? [];
      this.listFolder = res["dirList"];
      this.dataSource.data = res["fileList"]

      //this.getDirInfoEvent.emit(res);
      // this.selectedFolder = '';
      
    })
    //this.fileService$.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    //this.updateFileElementQuery();
  }
  deleteFolder(sourceDir:  { dirName: string; updated: Date; }) {
    console.log(sourceDir);
    
    const dialogRef = this.dialog$.open(ConfirmDialogComponent, {
      data: {dialogTitle: '확인', confirmMessage: '해당 폴더를 삭제하시겠습니까?'}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    
      if (res) {
      console.log(res);
      this.deleteDir(sourceDir);
      //this.renameFile(sourceFile, res)
      //this.addFolder(res)
      //this.folderAdded.emit({ name: res });
      }
    }); 

    //this.elementRemoved.emit(element);
  }
  deleteDir(sourceDir:  { dirName: string; updated: Date; }) {
    //console.log('addFolder');
    let params: HttpParams = new HttpParams();
    params = params.set('deleteFolder', sourceDir.dirName)
    params = params.set('queryDirJoin', this.serverfolders.join('?'))
    
    
    this.fileService$.deleteFolder(params)
    .subscribe((res: any) => {
      console.log(res);

      //this.dataSource.data = res["fileNames"];
      this.serverfolders = res["queryDirPath"] ?? [];
      this.listFolder = res["dirList"];
      this.dataSource.data = res["fileList"]

      //this.getDirInfoEvent.emit(res);
      // this.selectedFolder = '';
      
    })
    //this.fileService$.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    //this.updateFileElementQuery();
  }
  openMenu(event: MouseEvent, element: any, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }

  openSnackBar(message: string, action: string) {
    
    this.snackBar$.open(message, action,{
      duration: 60000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      
    });
  }
}
