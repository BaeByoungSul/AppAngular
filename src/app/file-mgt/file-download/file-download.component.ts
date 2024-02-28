import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DirListComponent } from '../dir-list/dir-list.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpEventType, HttpParams } from '@angular/common/http';
import { FileApiService } from '../../_service/file-api.service';
import { SnackbarService } from '../../_service/snackbar.service';
import { FileList2Component } from '../file-list2/file-list2.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-file-download',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressBarModule,
    DirListComponent,
    FileList2Component
  ],
  templateUrl: './file-download.component.html',
  styleUrl: './file-download.component.css'
})
export class FileDownloadComponent  implements OnInit, AfterViewInit{
  
  @ViewChild('paginator') paginator!: MatPaginator;
  progress : number = 0;
  queryDirPath : string[] = [];
  dirList: { dirName: string; updated: Date; }[] | undefined | null ;
  fileList: {fileName: string; fileSize: string;}[] | undefined | null ;
  
  dataSource = new MatTableDataSource<{fileName: string; fileSize: string;}>([]);
  selection = new SelectionModel<{fileName: string; fileSize: string;}>(true, []);

  displayedColumns: string[] = ['select', 'fileName', 'fileSize'];

  constructor(
    private fileService$:FileApiService,
    private snackBar$: SnackbarService
  ){}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    //this.queryInFolder(['개발공부기록','Angular']);
    this.queryInFolder([]);

  }

  queryInFolder(serverPath: string[]) {
    console.log(serverPath);
    this.selection.clear()
    //this.dataSource.data=[];
    //<--reset all items
        let params: HttpParams = new HttpParams();
        params = params.set('queryDirJoin', serverPath.join('?'))
        
        //this.subjectService$.setLoading(true);
        this.fileService$.queryInFolder(params)
        .subscribe({
          next: (res) =>{
            console.log(res);
            this.queryDirPath = res["queryDirPath"] ?? [];
            this.dirList = res["dirList"];
           // this.fileList = res["fileList"];
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

  //https://stackoverflow.com/questions/52154874/angular-6-downloading-file-from-rest-api
  downloadFileZip(){

    if(this.selection.selected.length <= 0 ){
      this.snackBar$.info("선택된 파일이 없습니다.")
      return;
    }
    let selectedFiles: string[] = [];
    for (let item of this.selection.selected) {
      console.log(item);
      selectedFiles.push(item.fileName);
    }
    let params: HttpParams = new HttpParams();
    params = params.set('filesJoin', selectedFiles.join('?'))
                   .set('subDirectory', this.queryDirPath.join('?'));

    this.progress = 0                   
    this.fileService$.downloadFileZip(params)                   
        .subscribe((res:any)=>{
          if (res.type === HttpEventType.DownloadProgress ||
              res.type === HttpEventType.UploadProgress) {
            console.log(res);
            this.progress = Math.round(100 * res.loaded / res.total!);
          }
          else if (res.type === HttpEventType.Response) {

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(new Blob([res.body], { type: res.body.type }));
    
            const contentDisposition = res.headers.get('content-disposition');
            const fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
            downloadLink.download = fileName;
            downloadLink.click();
          }
        });
  }
  downloadFile(){
    for (let item of this.selection.selected) {
      console.log(item);
      this.downloadFileApi(item.fileName, this.queryDirPath.join('?'));
    }
  }

  private downloadFileApi(fileName: string, subDirectory: string) {

    let params: HttpParams = new HttpParams();
    params = params.set('fileName', fileName)
                   .set('subDirectory', subDirectory);

    this.fileService$.downloadFile(params)                   
        .subscribe((event:any)=>{
          if (event.type === HttpEventType.DownloadProgress ||
              event.type === HttpEventType.UploadProgress) {
            console.log(event);
            this.progress = Math.round(100 * event.loaded / event.total!);
          }
          else if (event.type === HttpEventType.Response) {
            console.log(event);
  
            const contentDisposition = event.headers.get('content-disposition');
            var filename1 = contentDisposition?.split(';');
            console.log(decodeURIComponent(filename1![2].split('=')[1].replace("utf-8''", '')));
  
  
            var blob = event.body as Blob;
            var url = window.URL.createObjectURL(blob);
            var anchor = document.createElement("a");
            anchor.download = fileName; //decodeURIComponent(filename!);
            anchor.href = url;
            anchor.click();
  
  
          }
        });
    // this.http$.get('https://172.20.105.36:8120/api/File/DownloadFile',
    //   {
    //     params: params,
    //     responseType: 'blob',
    //     observe: 'events',
    //     reportProgress: true
    //   })
    //   .subscribe((event) => {


    //     if (event.type === HttpEventType.DownloadProgress ||
    //       event.type === HttpEventType.UploadProgress) {
    //       //            console.log(event);
    //       this.progress = Math.round(100 * event.loaded / event.total!);
    //     }
    //     else if (event.type === HttpEventType.Response) {
    //       console.log(event);

    //       const contentDisposition = event.headers.get('content-disposition');
    //       var filename1 = contentDisposition?.split(';');
    //       console.log(decodeURIComponent(filename1![2].split('=')[1].replace("utf-8''", '')));


    //       var blob = event.body as Blob;
    //       var url = window.URL.createObjectURL(blob);
    //       var anchor = document.createElement("a");
    //       anchor.download = fileName; //decodeURIComponent(filename!);
    //       anchor.href = url;
    //       anchor.click();


    //     }




    //   })
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
    this.selection.selected.forEach(s => console.log(s.fileName));
  }
}
