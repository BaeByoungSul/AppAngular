import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { MyCommand } from '../../_model/my-command';
import { MyPara } from '../../_model/my-para';

import { DbApiService } from '../../_service/db-api.service';
import { SnackbarService } from '../../_service/snackbar.service';

@Component({
  selector: 'app-dbview01',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './dbview01.component.html',
  styleUrl: './dbview01.component.css'
})
export class Dbview01Component implements AfterViewInit {
  loading$ = new BehaviorSubject<boolean>(false)

  form = new FormGroup({
    yymm: new FormControl("", Validators.required),
    plant: new FormControl("", Validators.required),
    procs: new FormControl("")
  });

  displayedColumns: string[]= ['YYMM', 'PLANT', 'PROCESS', 'SPROCESS', 'CITEM', 'CTYPE',
  'BEGIN_QTY', 'IPGO_QTY', 'CHGO_QTY', 'END_QTY'
  ];
  displayedColumns2: string[] = ['월', '플랜트', '공정1', '공정2', '품명1', '품명2',
  '기초수량', '입고수량', '출고수량', '마감수량'
  ];
  dataSource = new MatTableDataSource([]);
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

  constructor(
    private dbService$: DbApiService,
    private snackBar$ : SnackbarService
  ){
    this.form.controls.yymm.setValue('202212');
    this.form.controls.plant.setValue('DF OC');
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getErrorMsg(ctrlName: string){
    const ctrl = this.form.get(ctrlName);

    var maxLengthValue ;//= ctrl?.hasError('maxlength') ? ctrl.errors?.["maxlength"]["requiredLength"] : 0;
    var minLengthValue ;//= ctrl?.hasError('minlength') ? ctrl.errors?.["minlength"]["requiredLength"] : 0;
    
    if (ctrl?.hasError('maxlength')) {
      maxLengthValue = ctrl.errors?.["maxlength"]["requiredLength"];
    }
    if (ctrl?.hasError('minlength')) {
      maxLengthValue = ctrl.errors?.["minlength"]["requiredLength"];
    }
    
    return ctrl?.hasError('required') ?  'This field is required ' :
           ctrl?.hasError('pattern')  ? 'This field needs to be at least nine characters, one uppercase letter and at least 1 symbol' :
           ctrl?.hasError('email') ? 'Not a valid email' :
           ctrl?.hasError('minlength') ? `This field must be at least ${minLengthValue} characters long ` :
           ctrl?.hasError('maxlength') ?  `This field can be max ${maxLengthValue} characters long.` : '';
//           ctrl?.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  onSubmit(){
    
    if (this.form.invalid) {
      this.snackBar$.error("form is invalid!");
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

    this.loading$.next(true);
    //this.loading$ = true;
    this.dbService$.getDataSet(this.reqCommand)
    .subscribe({
      next: res => {
        console.log(res.Table);
        
        this.dataSource.data = res.Table;
        
      },
      error: err =>{
        console.log(err.message);
        
        if( typeof err.error === "string" )this.snackBar$.error(err.error);
        else this.snackBar$.error(err.message);
       
        this.loading$.next(false)
      },
      complete: ()=>{ this.loading$.next(false)}
    });  
  }
}
