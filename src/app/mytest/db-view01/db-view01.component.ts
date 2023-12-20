import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MyCommand, MyPara } from 'src/app/_model/dbcmd';
import { DbApiService } from 'src/app/_service/db-api.service';
import { LoadingService } from 'src/app/_service/loading.service';

@Component({
  selector: 'app-db-view01',
  templateUrl: './db-view01.component.html',
  styleUrls: ['./db-view01.component.css']
})
export class DbView01Component implements AfterViewInit {
  loading$ = this._loader.loading$;
  
  form = new FormGroup({
    yymm: new FormControl("", Validators.required),
    plant: new FormControl("", Validators.required),
    procs: new FormControl("")
    
  });

  displayedColumns: string[] = ['YYMM', 'PLANT', 'PROCESS', 'SPROCESS', 'CITEM', 'CTYPE',
    'BEGIN_QTY', 'IPGO_QTY', 'CHGO_QTY', 'END_QTY'
  ];
  displayedColumns2: string[] = ['월', '플랜트', '공정1', '공정2', '품명1', '품명2',
    '기초수량', '입고수량', '출고수량', '마감수량'
  ];
  dataSource = new MatTableDataSource([]);

  //dataSource!: any[];
  @ViewChild('paginator') paginator!: MatPaginator;

  reqPara: MyPara[]=[
    { parameterName: '@YYMM', dbDataType: 22, direction: 1 },
    { parameterName: '@PLANT', dbDataType: 22, direction: 1 },
    { parameterName: '@PROC', dbDataType: 22, direction: 1 },
    { parameterName: '@SEPARATOR', dbDataType: 22, direction: 1 },
  ]

  reqCommand: MyCommand ={
    commandName: 'MST',
    connectionName:'HUIZHOU',
    commandType: 4,
    commandText: 'ZBBS2..[USP_BCOST_0010_T2_SEL]',
    parameters: this.reqPara,
    paraValues: [ ]
  }
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'; //'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private _loader: LoadingService,
    private _snackBar : MatSnackBar,
    private _dbCmd: DbApiService
    
  ){
    this.form.controls.yymm.setValue('202212');
    this.form.controls.plant.setValue('DF OC');

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(){

    if (this.form.invalid) {
      //console.log('form is invalid');
      this.openSnackBar("form is invalid!", "Error");
      return;
    }
    this.dataSource.data = []

    // 파라미터값 초기화
    this.reqCommand?.paraValues?.splice(0);
    // 파라미터값  Dictionary 채우기
    var paraValues: { [id: string] : string; } = {};
    paraValues["@YYMM"]  = this.form.get('yymm')?.value!;
    paraValues["@PLANT"]  = this.form.get('plant')?.value! ;
    paraValues["@PROC"]  = this.form.get('procs')?.value ?? '';
    paraValues["@SEPARATOR"]  = ' '; //구분자 공백 한자리

    this.reqCommand.paraValues?.push( paraValues);
console.log(this.reqCommand);
    
    this._loader.show(); 
    this._dbCmd.getDataSet(this.reqCommand)
    .subscribe({
      next: res => {
        console.log(res.Table);
        
        this.dataSource.data = res.Table;
        this._loader.hide(); 
      },
      error: err =>{
        console.log(err.message);
        this.openSnackBar(err.error.detail, "Error");
        this._loader.hide(); 
      }
    });  
  }
  openSnackBar(message: string, action: string) {
    
    this._snackBar.open(message, action,{
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
}
