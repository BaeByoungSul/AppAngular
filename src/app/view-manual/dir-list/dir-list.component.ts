import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// input queryDirPath, dirList from parent
// output navigateFolder event >> 연결된 부모 함수를 실행해서 dirList Input과 ..
@Component({
  selector: 'app-dir-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dir-list.component.html',
  styleUrl: './dir-list.component.css'
})
export class DirListComponent implements OnChanges {

  @Input() queryDirPath : string[] = [];
  @Input() dirList: { dirName: string; updated: Date; }[] | undefined | null ;

  @Output() navigateFolder = new EventEmitter<string[]>();

  ngOnChanges(changes: SimpleChanges): void {
    // this.dirList?.forEach((dir)=>{
    //   console.log(dir);
    // })
  }
  folderPathClick(selectIndex: number) {
    // 선택한 server folder array index 보다 큰 것은 꺼낸다.
    // k: pop할 개수 ( 끄집어낸다. )
    var k = this.queryDirPath.length - (selectIndex + 1);
    for (let j = 1; j <= k; j++) {
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
}
