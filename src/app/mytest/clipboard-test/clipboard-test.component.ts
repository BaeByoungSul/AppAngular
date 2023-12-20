import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyCommand } from 'src/app/_model/dbcmd';
import { DbApiService } from 'src/app/_service/db-api.service';
export class CSVRecord {  
  public id: any;  
  public firstName: any;  
  public lastName: any;  
  public age: any;  
  public position: any;  
  public mobile: any;     
} 
@Component({
  selector: 'app-clipboard-test',
  templateUrl: './clipboard-test.component.html',
  styleUrls: ['./clipboard-test.component.css']
})

export class ClipboardTestComponent {
  //@Input() index;
  //@Input() element; //element.value = 0
  name = 'Paste it';
  columnCount : number = 0;
  //val:any;
  displayedColumns: string[]=[];
  dataSource: any[] = [];
  
  reqCommand: MyCommand ={
    commandName: 'MST',
    connectionName:'Phi_PDA',
    commandType: 1,
    commandText: 'SELECT top 10 * FROM ZHR',
    parameters: [],
    paraValues: []
  }
  constructor(private _dbCmd: DbApiService){
    //const copiedData = JSON.stringify(this.dataSource);
  }

  onChange($event :any){
    console.log( $event.target.value);

    this.columnCount = $event.target.value

    
    
  }

  clipData1(event:ClipboardEvent) {
    this.displayedColumns.length = 0;
    this.dataSource.length= 0;
    
    let clipboardData = event.clipboardData;
    if (clipboardData == null) return;
    let pastedText = clipboardData.getData('text');
    //pastedText.replace(/""/mg, '"');
    console.log(pastedText);

    //g - Global replace. Replace all instances of the matched string in the provided text.
    //i - Case insensitive replace. Replace all instances of the matched string, ignoring differences in case.
    //m - Multi-line replace. The regular expression should be tested for matches over multiple lines.

    // Great :https://gist.github.com/torjusb/7d6baf4b68370b4ef42f
    var rows = pastedText.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/mg, function (match, p1) {
      // This function runs for each cell with multi lined text.
      return p1
          // Replace any double double-quotes with a single
          // double-quote
          .replace(/""/g, '"')
          // Replace all new lines with spaces.
          .replace(/\r\n|\n\r|\n|\r/g, ' ');
    })
    // Split each line into rows
    .split(/\r\n|\n\r|\n|\r/g);

    // 첫번째 행으로 컬럼 만들기
    rows[0].split('\t').forEach((colData,index) => {
      console.log(`${index} : ${colData}`);
      this.displayedColumns.push('col'+ index) ;
    });
   
    rows.forEach(row=>{
      const temp: {[index: string]:any} = {}
      //this.displayedColumns.forEach((a, index)=>{temp[a]= row.split('\t')[index]});
      console.log(row);
      if  (row == '') {
      }else {
        row.split('\t').forEach((coldata,index )=>{
          console.log(coldata);
          //coldata.replace('\u1310','\r\n');
          temp['col'+index] = coldata;
        });
        this.dataSource.push(temp)
      }

    })
  }
  
  // 엑셀에서 복사한 Clipboard에 multiline이고 double qoutation도 있는 상태
  // 1. Tab으로 분리해서 엑셀에서 복사한 열을 나눈다.
  // 2. 마지막 열과 다음 행은 탭으로 분리되지 않아서 입력된 컬럼수를 가지고
  //    마지막 컬럼을 복사해서 Array에 Insert(colArray.splice(i, 0, colArray[i]) )
  // 3. 행으로 해당 Array를 잘라서 data소스에 push ( text multiline 로직 )
  //    colArray.slice(i, i+iColCnt) >> ("" 를 " 변경 ) >> 첫번째와 마지막 문자 (") 제거
  // 4. 마지막 컬럼에서 /r/n을 찾아서 이후 값을 마지막 컬럼값으로 한다.
  // 4. 첫번째 컬럼에서 /r/n을 찾아서 이전 값을 첫번째 컬럼값으로 한다.
  //   ( 4 >> tab으로 분리하면 마지막컬럼의 값과 다음행 첫번째 값이 합쳐져서 해당 로직으로 분리 )
  clipTest(event:ClipboardEvent) {
    this.dataSource.length= 0;
    this.displayedColumns.length = 0;

    if( this.columnCount == 0)    {
      console.log('Set Column count first');
      return;
    }
    
    
    
    //this.dataSource.length= 0;

    // 컬럼 수로 컬럼 만들기
    const iColCnt : number =  Number( this.columnCount);
    for (let coli = 0; coli < iColCnt ; coli++) {
      this.displayedColumns.push('col'+ coli) ;
    }
    
    let clipboardData = event.clipboardData;
    if (clipboardData == null) return;
    
    let pastedText = clipboardData.getData('text');
    if (!pastedText && pastedText.length) return;
    console.log(pastedText.replace(/\t/g, '####'));

    var colArray = pastedText.split('\t');
    // colArray.forEach(item => {
    //   console.log(item);
      
    // });

console.log(colArray.length);
   
   // colArray.splice(3, 0, colArray[3])
   // colArray.splice(7, 0, colArray[7])

console.log(colArray.length);
  console.log(iColCnt);
  
    // 마지막 컬럼에 Array Item 추가한다.
    for (let i = 0; i < colArray.length ; i++) {
      //console.log(colArray[i]);    
      if(i%(iColCnt) == iColCnt -1 ){
        
        if (i != colArray.length -1){
          console.log('Splice:' + i);
          colArray.splice(i, 0, colArray[i])
        } 
      }
      
      console.log((i%iColCnt) + ':' + colArray[i] );
    }
    console.log(colArray);
  
    console.log('Start to split to row');
    // var arrayOfArrays = [];
    // for( var i =0; i < colArray.length; i+= this.columnCount){
    //   arrayOfArrays.push(colArray.slice(i, i+4))
    // }
    // console.log(arrayOfArrays);
    
    //Javascript remove double quotes from start and end of a string using replace()
//     console.log(this.columnCount);
//     for( var i =0; i < colArray.length; i = i + iColCnt){
      
//       console.log(colArray.slice(i, i+iColCnt));
//       //console.log(colArray.slice(i, i+4));
//       const temp: {[index: string]:any} = {}
//       colArray.slice(i, i+iColCnt).forEach((data, index)=>{
//         temp['col'+index] = data
//       });
//       //console.log(temp);
      
//       this.dataSource.push(temp);
//       console.log(this.dataSource);
      
//     }
// return;
    let iLastIndex: number ;
    for( var i =0; i < colArray.length; i+= iColCnt){
      //arrayOfArrays.push(colArray.slice(i, i+4))
      console.log(colArray.slice(i, i+iColCnt));
      
      const temp: {[index: string]:any} = {}
      colArray.slice(i, i+iColCnt).forEach((data, index)=>{
        //console.log(index + ':' + data);
        temp['col'+index] = data.replace(/""/g, '"').replace(/(^"|"$)/mg, '');

        if (index == 0 ) {
          //console.log(data.slice(data.lastIndexOf('\n'), data.length ));
          //console.log(data.lastIndexOf('\n'));
          iLastIndex  = temp['col'+index].lastIndexOf('\n');
console.log(iLastIndex);

          temp['col'+index] = temp['col'+index].slice(iLastIndex+1, data.length )
          //var data2 = data.slice(data.lastIndexOf('\n'), data.length )
          //temp['col'+index] = data2.replace(/""/g, '"').replace(/(^"|"$)/mg, '');
        } 
        else if ( index == iColCnt-1){
          iLastIndex  = temp['col'+index].lastIndexOf('\n');
          temp['col'+index] = temp['col'+index].slice(0, iLastIndex-1 )
        }
        
        //console.log(data.replace );
      })
      
      this.dataSource.push(temp);
    }
  }


  clipData2(event:ClipboardEvent) {
    this.displayedColumns.length = 0;
    this.dataSource.length= 0;
    
    let clipboardData = event.clipboardData;
    if (clipboardData == null) return;
    
    let pastedText = clipboardData.getData('text');
    if (!pastedText && pastedText.length) return;
    
    pastedText.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/mg, function (match, p1) {
      // This function runs for each cell with multi lined text.
      console.log(p1);
      
      return p1
          // Replace any double double-quotes with a single
          // double-quote
          .replace(/""/g, '"')
          // Replace all new lines with spaces.
//          .replace(/\r\n|\n\r|\n|\r/g, ' ');
          .replace(/\r/g, ' ');
    })

    //pastedText.replace(/""/mg, '"');
    console.log(pastedText);
    
    // 테스트 ascii 값 
    for (let i = 0; i < pastedText.length; i++) {
      const character = pastedText.charAt(i);
      pastedText.charCodeAt(i);
      console.log(i, pastedText.charCodeAt(i));
    }
    //return; 
    
    // 행으로 나눔 : CR LF 
    let clipRowsArray = [];
    //clipRowsArray = pastedText.replace(/""/g, '"').split(/\r\n/g);
    clipRowsArray = pastedText.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/mg, function (match, p1) {
      // This function runs for each cell with multi lined text.
      return p1
          // Replace any double double-quotes with a single
          // double-quote
          .replace(/""/g, '"')
          // Replace all new lines with spaces.
//          .replace(/\r\n|\n\r|\n|\r/g, ' ');
          .replace(/\r/g, ' ');
    }).split(/\r\n/g);
    console.log(clipRowsArray);

    // loop 행
    clipRowsArray.forEach((colData,index) => {
      console.log(index);
      
      console.log(`${index} : ${colData}`);
    });

    // 첫번째 행으로 컬럼 만들기
    clipRowsArray[0].split('\t').forEach((colData,index) => {
      console.log(`${index} : ${colData}`);
      this.displayedColumns.push('col'+ index) ;
    });

    clipRowsArray.forEach(row=>{
      const temp: {[index: string]:any} = {}
      //this.displayedColumns.forEach((a, index)=>{temp[a]= row.split('\t')[index]});
      console.log(row);
      if  (row == '') {
      }else {
        row.split('\t').forEach((coldata,index )=>{
          console.log(coldata);
          //var aaa = coldata.replace(/\r\n|\n\r|\n|\r/g, ' ');
          temp['col'+index] = coldata;
        });
        this.dataSource.push(temp)
      }

    })
    
    // var rows2 = pastedText.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/mg, function (match, p1) {
    //   // This function runs for each cell with multi lined text.
    //   return p1
    //       // Replace any double double-quotes with a single
    //       // double-quote
    //       .replace(/""/g, '"')
    //       // Replace all new lines with spaces.
    //       .replace(/\r\n|\n\r|\n|\r/g, '@@@');
    // })
    // console.log(rows2);
    
//     let clipRowsArray = [];
//     clipRowsArray = rows2.split(String.fromCharCode(13));
//     console.log(clipRowsArray);
//     // 첫번째 행으로 컬럼 만들기
//     clipRowsArray[0].split('\t').forEach((colData,index) => {
//       console.log(`${index} : ${colData}`);
//       this.displayedColumns.push('col'+ index) ;
//     });

//     clipRowsArray.forEach(row=>{
//       const temp: {[index: string]:any} = {}
//       //this.displayedColumns.forEach((a, index)=>{temp[a]= row.split('\t')[index]});
//       console.log(row);
//       if  (row == '') {
//       }else {
//         row.split('\t').forEach((coldata,index )=>{

//           console.log(coldata);

//           //coldata.replace('\u1310','\r\n');
//           temp['col'+index] = coldata;
//         });
//         this.dataSource.push(temp)
//       }

//     })
return;
    // pastedText.split('\t').forEach((colData,index) => {
    //   console.log(`${index} : ${colData}`);
    //   this.displayedColumns.push('col'+ index) ;
    // });
    //var rows2 = pastedText.replace(/""/g, '"').replace(/\r\n|\n\r|\n|\r/g, ' ');
    //var rows3 = rows2.split(/\r?\n/);
    //console.log(rows2[0]);
    
//console.log(pastedText);
  //console.log(rows2);
  //console.log(rows3);
return;
    // 첫번째 행으로 컬럼 만들기
    // rows2[0].split('\t').forEach((colData,index) => {
    //   console.log(`${index} : ${colData}`);
    //   this.displayedColumns.push('col'+ index) ;
    // });
return;
    //g - Global replace. Replace all instances of the matched string in the provided text.
    //i - Case insensitive replace. Replace all instances of the matched string, ignoring differences in case.
    //m - Multi-line replace. The regular expression should be tested for matches over multiple lines.

    // Great :https://gist.github.com/torjusb/7d6baf4b68370b4ef42f
    var rows = pastedText.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/mg, function (match, p1) {
      // This function runs for each cell with multi lined text.
      return p1
          // Replace any double double-quotes with a single
          // double-quote
          .replace(/""/g, '"')
          // Replace all new lines with spaces.
          .replace(/\r\n|\n\r|\n|\r/g, ' ');
    })
    // Split each line into rows
    .split(/\r\n|\n\r|\n|\r/g);

    // 첫번째 행으로 컬럼 만들기
    rows[0].split('\t').forEach((colData,index) => {
      console.log(`${index} : ${colData}`);
      this.displayedColumns.push('col'+ index) ;
    });
    // rows.forEach(row=>{
      
    //   if  (row == '') {
    //     console.log('row is empty');
    //   }else {
    //     console.log(row);
    //   }

    //   //this.displayedColumns.forEach((a, index)=>{temp[a]= row.split('\t')[index]});
      
    // });
    // return;
    rows.forEach(row=>{
      const temp: {[index: string]:any} = {}
      //this.displayedColumns.forEach((a, index)=>{temp[a]= row.split('\t')[index]});
      console.log(row);
      if  (row == '') {
      }else {
        row.split('\t').forEach((coldata,index )=>{
          console.log(coldata);
          //coldata.replace('\u1310','\r\n');
          temp['col'+index] = coldata;
        });
        this.dataSource.push(temp)
      }

    })
    
    return 
    
    rows.forEach(row =>{
      
      let temp:string[] = [];
      row.split('\t').forEach((coldata,index )=>{
        console.log(coldata);
        temp[index] = coldata;
      });
      console.log(temp);
      
      this.dataSource.push(temp)
      console.log(row);
    })


    // let row_data = pastedText?.split('\n');
    // row_data.forEach((row )=>{
    //   console.log(row);
      
    // })
    //console.log(pastedText);
    return;
    // let row_data : string[] | undefined;
    // row_data = pastedText?.split('\n');
    // if(row_data){
    //     this.displayedColumns = row_data[0].split('\t');
    //     delete row_data[0];
    // }
    // // Create table dataSource
    // let data: any[]=[];

    // row_data?.forEach(row_data=>{
    //   console.log(row_data);
      
    //     //let row: {};
    //     //this.displayedColumns.forEach((a, index)=>{row[a]= row_data.split('\t')[index]});
    //     //data.push(row);
    // })
    // this.dataSource = data;
  }
  copyData() {
    //const copiedData = JSON.stringify(this.dataSource)
    //console.log(JSON.stringify(this.dataSource));
    return JSON.stringify(this.dataSource);
  }

  copyTable() {
    let nodeData = this.dataSource;
    var tbl = document.createElement('table');
    var tblBody = document.createElement('tbody');
    var headerow = document.createElement('tr');
    var header = this.displayedColumns;
    
    //this.displayedColumns.forEach((a, index)=>{temp[a]= row.split('\t')[index]});
    this.displayedColumns.forEach((a, index)=>{
      headerow.innerHTML +=`<td>${a}</td>`
    });
    //headerow.innerHTML = tmpString;
    //headerow.innerHTML = `<td>${header[0]}</td><td>${header[1]}</td><td>${header[2]}</td><td>${header[3]}</td>`;
    
    tblBody.appendChild(headerow);
    nodeData.forEach((rowData) => {
        var row = document.createElement('tr');
        console.log(rowData);
        
        this.displayedColumns.forEach((colName, index)=>{
          console.log(rowData[colName]);
          row.innerHTML +=`<td>${rowData[colName]}</td>`
        });
        //row.innerHTML = `<td>${data.col0}</td><td>${data.col1}</td><td>${data.col2}</td><td>${data.col3}</td>`;
        tblBody.appendChild(row);
    });
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    // Copy the table element innerText to clipboard
    navigator.clipboard.writeText(tbl.innerText);
    // Hide the table element from DOM after copied
    tbl.style.display = "none";
  }
  onQueryDb(){

    this.dataSource = []

    // 파라미터값 초기화
    this.reqCommand?.paraValues?.splice(0);
    // 파라미터값  Dictionary 채우기
    
console.log(this.reqCommand);
  this.displayedColumns.splice(0);
    this._dbCmd.getDataSet(this.reqCommand)
    .subscribe({
      next: res => {
        console.log(res.Table);

        for (var prop in res.Table[0]) {
          console.log("Key:" + prop);
          this.displayedColumns.push(prop) ;
          //console.log("Value:" + res.Table[0][prop]);
        }
        // res.Table[0].forEach((item:any) =>{
        //   console.log(item);
          
        // });
        this.dataSource = res.Table;
        
      },
      error: err =>{
        console.log(err.message);
        // this.openSnackBar(err.error.detail, "Error");
        // this._loader.hide(); 
      }
    });  
  }
}
