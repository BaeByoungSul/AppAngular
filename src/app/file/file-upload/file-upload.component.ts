import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from 'src/app/_service/file.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  // inputText: string = 'Hi...have a nice day - message from parent';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  
  // root path부터 시작한 path array
  // data from app-dir-list
  serverfolders: string[] = [];
  folders: { dirName: string; updated: Date; }[] = [];
  dataSource = new MatTableDataSource<{fileName: string; size: string;}>([]);
  
  // tab1 사용 
  _multiple = false;
  _selectedFiles:File[] = [];
  // _selectedFileNames: string []= [];
  // _selectedFileNameJoin: string = ''

  //myFiles: File[] = [];

  //selectedFiles: string []= [];
  //selectedFilesJoin: string = ''
  
  loading: boolean = false; // Flag variable
  progress: number = 0;
  
  // file input reset하기 위해서 
  @ViewChild("takeInput", {static: false})InputVar!: ElementRef;
  
  constructor(
    private _fileService:FileService
  ){}

  receiveDirInfo($event:any) {
    console.log('receiveDirInfo');
    
    console.log($event);
    this.serverfolders = $event["dirPathArray"] ?? [];
    this.folders = $event["subDirNames"];
    this.dataSource.data = $event["fileInfos"];
    
    //this.message = $event
  }
// On file Select
onFileSelect(event: any) {

  this._selectedFiles = [];

  //this.myFiles = event.target.files;
  
  //this.file = event.target.files[0];
  for (var i = 0; i < event.target.files.length; i++) {
    console.log(event.target.files[i].name);
    this._selectedFiles.push(event.target.files[i]);
    //this.myFiles.push(event.target.files[i]);
    //this._selectedFileNames.push(event.target.files[i].name);
  }
  //this._selectedFileNameJoin = this._selectedFileNames.join(', ') 
  //this.myFiles.forEach.
}

 
  
    // OnClick of button Upload
  onUpload() {

      // for (var i = 0; i < this.file.length; i++) {
      //   formData.append("file[]", this.file);
      // }
      //let fileToUpload = <File>this.file;
  
      //let headers = new HttpHeaders();
      //headers.append('Content-Disposition', 'multipart/form-data;boundary='+Math.random());
      // headers.append('Accept', '*/*');
      const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
  
      let params: HttpParams = new HttpParams();
      params = params.set('subDirectory', this.serverfolders.join('?'));
      
  //console.log(params );
  
      const formData = new FormData();
      // api변수명과 일치해야 함( formFiles )
      for (var i = 0; i < this._selectedFiles.length; i++) {
        formData.append("formFiles", this._selectedFiles[i], this._selectedFiles[i].name);
      }
      this.loading = !this.loading;
      this.progress = 0;
      this._fileService.uploadFiles(formData,params)
          .subscribe({
            next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total!);
            }
            else if (event.type === HttpEventType.Response){
              console.log(event);
              //this.showSuccess = true;
              this._selectedFiles = []
              this.InputVar.nativeElement.value = null;
              //this.myFiles = null;
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            
        //    this.showError = true;
            //this.errorMessage = err.error;
          }
        });

      
       
    }
}
