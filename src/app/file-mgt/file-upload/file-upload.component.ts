import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { FileApiService } from '../../_service/file-api.service';
import { FileMgtModule } from '../file-mgt.module';
import { DirListComponent } from '../dir-list/dir-list.component';
import { FileListComponent } from '../file-list/file-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../_service/snackbar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    CdkMenuModule,
    DirListComponent,
    FileListComponent
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements OnInit {
  //serverfolders: string[] = [];
  _multiple = false;
  _selectedFiles:File[] = [];
  // file input reset하기 위해서 
  @ViewChild("fileInput", {static: false})InputVar!: ElementRef;

  progress : number = 0;
  queryDirPath : string[] = [];
  dirList: { dirName: string; updated: Date; }[] | undefined | null ;
  fileList: {fileName: string; fileSize: string;}[] | undefined | null ;
  dataSource = new MatTableDataSource<{fileName: string; fileSize: string;}>([]);
  
  
  constructor(
    private fileService$:FileApiService,
    private snackBar$: SnackbarService
  ){}

  ngOnInit(): void {
    //this.queryInFolder(['개발공부기록','Angular']);
    this.queryInFolder([]);
  }

  queryInFolder(serverPath: string[]) {
    console.log(serverPath);
    
        let params: HttpParams = new HttpParams();
        params = params.set('queryDirJoin', serverPath.join('?'))
        
        //this.subjectService$.setLoading(true);
        this.fileService$.queryInFolder(params)
        .subscribe({
          next: (res) =>{
            console.log(res);
            this.queryDirPath = res["queryDirPath"] ?? [];
            this.dirList = res["dirList"];
            this.fileList = res["fileList"];
            this.dataSource.data = res["fileList"];

            // this.serverfolders = res["queryDirPath"] ?? [];
            // this.listFolder = res["dirList"];
            // this.dataSource.data = res["fileList"]
          },
          error: (err) => {
            console.log(err);
            // this.serverfolders.pop();
            // this.openSnackBar(err.error, "Close");
          },
          complete: () => {
            //this.subjectService$.setLoading(false);
          }
        });

  }
  addFolder(createInfo: {serverPath: string[], folderName:string} ) {
    console.log('addFolder');
    
    console.log(createInfo.folderName);
    let params: HttpParams = new HttpParams();
    params = params.set('newFolder', createInfo.folderName)
    params = params.set('serverDirJoin', createInfo.serverPath.join('?'))
    
    //this.subjectService$.setLoading(true);
    this.fileService$.createFolder(params)
    .subscribe({
      next: (res) =>{
        console.log(res);
        this.queryDirPath = res["queryDirPath"] ?? [];
        this.dirList = res["dirList"];
        this.fileList = res["fileList"];
        this.dataSource.data = res["fileList"];
      },
      error: (err) => {
        console.log(err);
   
      },
      complete: () => {
        //this.subjectService$.setLoading(false);
      }
    });


    //this.fileService$.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    //this.updateFileElementQuery();
  }
  deleteFolder(deleteInfo: {serverPath: string[], folderName:string} ) {
    //console.log(deleteInfo);
    

    let params: HttpParams = new HttpParams();
    params = params.set('deleteFolder', deleteInfo.folderName)
    params = params.set('queryDirJoin', deleteInfo.serverPath.join('?'))
    
    //this.subjectService$.setLoading(true);
    this.fileService$.deleteFolder(params)
    .subscribe({
      next: (res) =>{
        console.log(res);
        this.queryDirPath = res["queryDirPath"] ?? [];
        this.dirList = res["dirList"];
        this.fileList = res["fileList"];
        this.dataSource.data = res["fileList"];
      },
      error: (err) => {
        console.log(err);
   
      },
      complete: () => {
        //this.subjectService$.setLoading(false);
      }
    });


    //this.fileService$.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    //this.updateFileElementQuery();
  }
  onFileSelect(event: any): void {
    this._selectedFiles = [];

    for (var i = 0; i <  event.target.files.length; i++) {
      console.log(event.target.files[i].name);
      this._selectedFiles.push(event.target.files[i]);

    }
   
  }

  
  onUpload(){
  
   
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
  
    let params: HttpParams = new HttpParams();
    params = params.set('subDirectory', this.queryDirPath.join('?'));

    const formData = new FormData();
    // api변수명과 일치해야 함( formFiles )
    for (var i = 0; i < this._selectedFiles.length; i++) {
      formData.append("formFiles", this._selectedFiles[i], this._selectedFiles[i].name);
    }
    //this.loading = !this.loading;
    this.progress = 0;
    this.fileService$.uploadFiles(formData,params)
        .subscribe({
          next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total!);
          }
          else if (event.type === HttpEventType.Response){
            console.log(event);

            this._selectedFiles = []
            this.InputVar.nativeElement.value = null;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.snackBar$.error(err.message)

        }
      });
    
  }
  
  deleteFile( sourceFile : {fileName:string } ) {
    //console.log(deleteInfo);
    
    let params: HttpParams = new HttpParams();
    params = params.set('queryDirJoin', this.queryDirPath.join('?'))
    params = params.set('sourceFileName', sourceFile.fileName)
    
    //this.subjectService$.setLoading(true);
    this.fileService$.deleteFile(params)
    .subscribe({
      next: (res) =>{
        console.log(res);
        this.queryDirPath = res["queryDirPath"] ?? [];
        this.dirList = res["dirList"];
        //this.fileList = res["fileList"];
        this.dataSource.data = res["fileList"];
      },
      error: (err) => {
        console.log(err);
   
      },
      complete: () => {
        //this.subjectService$.setLoading(false);
      }
    });


    //this.fileService$.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    //this.updateFileElementQuery();
  }
  renameFile( fileInfo : {fileName:string, renameFile: string }){
    let params: HttpParams = new HttpParams();
    params = params.set('queryDirJoin', this.queryDirPath.join('?'))
    params = params.set('sourceFileName', fileInfo.fileName)
    params = params.set('moveFileName', fileInfo.renameFile)

    //this.subjectService$.setLoading(true);
    this.fileService$.renameFile(params)
    .subscribe({
      next: (res) =>{
        console.log(res);
        this.queryDirPath = res["queryDirPath"] ?? [];
        this.dirList = res["dirList"];
        //this.fileList = res["fileList"];
        this.dataSource.data = res["fileList"];
      },
      error: (err) => {
        console.log(err);
   
      },
      complete: () => {
        //this.subjectService$.setLoading(false);
      }
    });

  }
}
