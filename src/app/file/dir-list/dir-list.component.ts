import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from 'src/app/_service/file.service';

@Component({
  selector: 'app-dir-list',
  templateUrl: './dir-list.component.html',
  styleUrls: ['./dir-list.component.css']
})
export class DirListComponent implements OnInit {
  serverfolders: string[] = [];  // 선택한 서버 폴더 계층( dir1 >> dir2 >> ..)
  folders: { dirName: string; updated: Date; }[] = [];
  dataSource = new MatTableDataSource<{fileName: string; size: string;}>([]);
  
  @Output() getDirInfoEvent = new EventEmitter<any>();
  //@Output() subfoldersEvent = new EventEmitter<{ dirName: string; updated: Date; }[]>();


  constructor(
    private _fileService:FileService
  ){}
  ngOnInit(): void {
    this.homeClick();
  }
  
  homeClick() {
    //this.serverfolders = [];
    this.getDirInfo([]);
  }

  getDirInfo(serverpath: string[]) {

    let params: HttpParams = new HttpParams();
    params = params.set('subDirectory', serverpath.join('?'))
    
    this._fileService.getDirLists(params)
      .subscribe((res: any) => {
        console.log(res);

        //this.dataSource.data = res["fileNames"];
        this.dataSource.data = res["fileInfos"];
        this.folders = res["subDirNames"];
        this.serverfolders = res["dirPathArray"] ?? [];

        this.getDirInfoEvent.emit(res);
        // this.selectedFolder = '';
        
      })
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

}
