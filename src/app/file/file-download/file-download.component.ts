import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from 'src/app/_service/file.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent {
  // root path부터 시작한 path array
  // data from app-dir-list
  serverfolders: string[] = [];
  folders: { dirName: string; updated: Date; }[] = [];
  dataSource = new MatTableDataSource<{fileName: string; size: string;}>([]);
    
  selection = new SelectionModel<{fileName: string;size: string;}>(true, []);
  progress: number = 0;
  constructor(
    private _fileService: FileService
  ){
  }
  receiveDirInfo($event:any) {
    console.log('receiveDirInfo');
    
    console.log($event);
    this.serverfolders = $event["dirPathArray"] ?? [];
    this.folders = $event["subDirNames"];
    this.dataSource.data = $event["fileInfos"];
    
    //this.message = $event
  }
  receiveSelection($event:any) {
    console.log('receiveSelection');
    this.selection = $event;
    console.log($event);
    //this.message = $event
  }
  downloadFile() {
    // 서버 폴더
    // var subDirectory: string[] = [];
    // if (this.currentSubfolder != null) {
    //   this.currentSubfolder.forEach((element) => {
    //     subDirectory.push(element);
    //   });
    // }

    for (let item of this.selection.selected) {
      console.log(item);
      this.downloadFileApi(item.fileName, this.serverfolders.join('?'));
    }

    console.log(this.serverfolders.join('?'));

    // this.dataSource.data.forEach( c => console.log(c)

    // );
    return;

  }
  private downloadFileApi(fileName: string, subDirectory: string) {

    let params: HttpParams = new HttpParams();
    params = params.set('fileName', fileName)
                   .set('subDirectory', subDirectory);

    this._fileService.downloadFile(params)                   
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
  
}
