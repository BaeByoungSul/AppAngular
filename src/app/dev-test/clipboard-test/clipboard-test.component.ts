import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-clipboard-test',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './clipboard-test.component.html',
  styleUrl: './clipboard-test.component.css'
})
export class ClipboardTestComponent {
  displayedColumns: string[]=[];
  dataSource: any[] = [];
  columnCount : number = 0;

  clipboardText = "";
  
  // Column count 변경할 때
  onChange($event :any){
    console.log( $event.target.value);
    this.columnCount = $event.target.value
  }

  async paste(){
    let clipText = await navigator.clipboard.readText();

    console.log(clipText);
    if( this.columnCount == 0)    {
      console.log('Set Column count first');
      return;
    }
    // clear mat-table
    this.dataSource = []
    this.displayedColumns =[];

    // 컬럼 수로 컬럼 만들기
    const iColCnt : number =  Number( this.columnCount);
    for (let coli = 0; coli < iColCnt ; coli++) {
      this.displayedColumns.push('col'+ coli) ;
    }
    // 컬럼 나누기, 유의할 사항은 마지막 컬럼은 \t가 아니고 \r\n
    let tabData = clipText.split(/\t/g)

    console.log(tabData);
        // 행이 바뀔 때는 \r\n로 분리되어서
    // 마지막 컬럼의 경우 한번더 \r\n로 split해야함
    for (let i = 0; i < tabData.length ; i++) {
      if( i%iColCnt == (iColCnt-1)) {
        //let lastColData = this.splitLastOccurrence(tabData[i], '\r\n');
        let lastColData = this.splitLastOccurrence(tabData[i], '\n');
        tabData[i]  = lastColData[0];
        tabData.splice(i+1, 0, lastColData[1] )
      }
      //console.log(tabData[i]);
    }
    
    // 행 단위로 loop를 돌면서 mat-table datasource 에 push
    // multi column data 처리는 
    // 1. 쌍따움표("")를 " 로 변경하고 
    // 2. multiline구분자 처음(^)과 끝($)의 구분자(")를 없앤다.
    for( var i =0; i < tabData.length; i+= iColCnt){
      
      console.log(tabData.slice(i, i+iColCnt));

      let row = tabData.slice(i, i+iColCnt)
      const temp: {[index: string]:any} = {}
    
      row.forEach((colData, index)=>{
        //data.replace(/""/g, '"').replace(/(^"|"$)/mg, '');replace(/""/gm, '"')
        temp['col'+index] = colData.replace(/""/gm, '"').replace(/(^"|"$)/gm, '');
      });
      this.dataSource.push(temp);
      //if(tabData[i]==='') 
      //console.log(tabData.slice(i, i+3));
    }    
  }
  // 행은 \r\n으로 나누어져 있어서 마지막에 발견되는 
  // \r\n을 찾아서 나눌수도 있고 \n을 찾을 수도 있다
  // https://bobbyhadz.com/blog/javascript-split-last-occurrence
  splitLastOccurrence(str:string, substring:string) {
    const lastIndex = str.lastIndexOf(substring);
  
    const before = str.slice(0, lastIndex);
  
    const after = str.slice(lastIndex + 1);
    //const after = str.slice(lastIndex + 2);
  
    return [before, after];
  }

  // 버튼 클릭 clip board paste 테스트
  // row단위 구분자가 명확하지 않음
  async paste_row() {
    let clipText = await navigator.clipboard.readText();
    let rowData = clipText.split(/\r\n/g);
    
    console.log(rowData);
    

    // clear mat-table
    this.dataSource = []
    this.displayedColumns =[];

    if (!clipText && clipText.length) return;
    
    //let rowCnt = 0;
    //let colCnt = 0;
    rowData[0].split(/\t/gm).forEach((colData, index)=>{
      this.displayedColumns.push('col'+ index) ;
    });
    rowData.forEach((row)=>{
      //console.log(row);

      const temp: {[index: string]:any} = {}
      row.split(/\t/gm).forEach((colData, index)=>{
        //colData = colData.replace(/""/gm, '"');
        temp['col'+index] = colData.replace(/""/gm, '"').replace(/(^"|"$)/g, '');;;
        //console.log(colData);
      })
      this.dataSource.push(temp);
    })

  }
  
}
