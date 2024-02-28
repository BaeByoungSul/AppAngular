import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { MyCommand } from '../../_model/my-command';
import { DbApiService } from '../../_service/db-api.service';

@Component({
  selector: 'app-copy-to-clipboard',
  standalone: true,
  imports: [
    CommonModule,
    ClipboardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './copy-to-clipboard.component.html',
  styleUrl: './copy-to-clipboard.component.css'
})
export class CopyToClipboardComponent implements AfterViewInit{
  loading$ = new BehaviorSubject<boolean>(false)

  displayedColumns: string[]=[];
  //dataSource: any[] = [];
  dataSource = new MatTableDataSource([]);
  @ViewChild('paginator') paginator!: MatPaginator;

  reqCommand: MyCommand ={
    commandName: 'MST',
    connectionName:'Phi_PDA',
    commandType: 1,
    commandText: 'SELECT top 10 * FROM ZHR',
    parameters: [],
    paraValues: []
  }
  constructor(private dbCmd$: DbApiService){
    //const copiedData = JSON.stringify(this.dataSource);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  copyData() {
    //const copiedData = JSON.stringify(this.dataSource)
    //console.log(JSON.stringify(this.dataSource));
    
    return JSON.stringify(this.dataSource.data);
  }
  
  copyTable() {
    let nodeData = this.dataSource.data;
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
    nodeData.forEach((rowData:any) => {
        var row = document.createElement('tr');
        //console.log(rowData);
        
        this.displayedColumns.forEach((colName, index)=>{
          var newstr = rowData[colName].toString();
          //newstr.replace(/(?:\r\n|\r|\n)/g, '<br>');
          //const lastIndex = str.lastIndexOf(substring);
          
          //셀이 multi row이면 
          if(newstr.lastIndexOf("\n") > 0){
            newstr ='"' + newstr + '"'
          }
          //newstr = newstr.replace(/(?:\r\n|\r|\n)/g, '<br>')
          newstr = newstr.replace(/(?:\r\n|\r|\n)/g, '<br>')
          //console.log( newstr);
          
          //console.log(newstr.replace('/\n|\r|\r\n/gm', '<br>'));
          row.innerHTML +=`<td>${newstr}</td>`
          // rowData[colName] = rowData[colName].replace('/\n/gm', '<br>')
          // row.innerHTML +=`<td>${rowData[colName]}</td>`
          //console.log(row.innerHTML);
          
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

    this.dataSource.data = []
    this.displayedColumns = []
    // 파라미터값 초기화
    this.reqCommand?.paraValues?.splice(0);
    // 파라미터값  Dictionary 채우기
    
//console.log(this.reqCommand);
  this.displayedColumns.splice(0);
  
  this.loading$.next(true);
  this.dbCmd$.getDataSet(this.reqCommand)
    .subscribe({
      next: res => {
        //console.log(res.Table[0]);

        // paginator를 사용하니까 오류가 나서 complete로 옮김
        // for (var prop in res.Table[0]) {
        //   console.log("Key:[" + prop + ']');
        //   this.displayedColumns.push(prop) ;
        //   //console.log("Value:" + res.Table[0][prop]);
        // }



        // res.Table[0].forEach((item:any) =>{
        //   console.log(item);
          
        // });
        this.dataSource.data = res.Table;
        
      },
      error: err =>{
        console.log(err.message);
        // this.openSnackBar(err.error.detail, "Error");
        // this._loader.hide(); 
      },
      complete: ()=>{
        for (var prop in  this.dataSource.data[0]) {
          //console.log("Key:[" + prop + ']');
          this.displayedColumns.push(prop) ;
          
        }
        this.loading$.next(false);
      }
    });  


  }
}
