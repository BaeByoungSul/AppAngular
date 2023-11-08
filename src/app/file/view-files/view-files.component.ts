import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent {
  serverfolders: string[] = [];
  folders: { dirName: string; updated: Date; }[] = [];
  dataSource = new MatTableDataSource<{fileName: string; size: string;}>([]);

  constructor(
    private _http:HttpClient
  ){}

  homeClick() {
    //this.serverfolders = [];
    this.getDirInfo([]);
  }
  folderClick(selectIndex: number) {
    // var subDirectory: string[] = [];
    // console.log(i);
    // if( i < this.serverfolders.length-1){
    //   console.log(this.serverfolders.length-1);
    // }

    // 선택한 server folder array index 보다 큰 것은 pop
    // k: pop할 개수
    var k = this.serverfolders.length - (selectIndex + 1);

    for (var j = 1; j <= k; j++) {
      this.serverfolders.pop();
    }

    console.log(this.serverfolders);

    this.getDirInfo(this.serverfolders);
  }
  subfolderClick(eventFolder: any) {
    //    console.log(eventFolder);
    //    console.log(this.serverfolders);

    // serverfolders가 null이면 오류..> get dir info에서 null이면 empty []
    this.serverfolders.push(eventFolder.dirName);
    this.getDirInfo(this.serverfolders);

  }

  getDirInfo(serverpath: string[]) {

    let params: HttpParams = new HttpParams();
    params = params.set('subDirectory', serverpath.join('?'))
    this._http.get('https://172.20.105.36:9020/api/File/GetDirInfo',
      {
        params: params
      })
      .subscribe((res: any) => {
        console.log(res);

        //this.dataSource.data = res["fileNames"];
        this.dataSource.data = res["fileInfos"];
        this.folders = res["subDirNames"];
        this.serverfolders = res["dirPathArray"] ?? [];

        // this.selectedFolder = '';
        
      })
  }


}
