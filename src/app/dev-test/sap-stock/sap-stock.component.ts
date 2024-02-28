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
import { Pp0370Req } from '../../_model/pp0370-req';
import { SapApiService } from '../../_service/sap-api.service';
import { SnackbarService } from '../../_service/snackbar.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-sap-stock',
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
  templateUrl: './sap-stock.component.html',
  styleUrl: './sap-stock.component.css'
})
export class SapStockComponent implements AfterViewInit {
  loading$ = new BehaviorSubject<boolean>(false)
    
  form = new FormGroup({
    plant: new FormControl("", Validators.required),
    lgorts: new FormControl("", Validators.required),
    //lgorts: new FormControl(""),
    matnrs: new FormControl(""),
    chargs: new FormControl("")
  });

  displayedColumns: string[] = ['WERKS', 'LGORT', 'MATNR', 'MAKTX', 'CHARG',
    'ZZCHARG', 'MEINS', 'KALAB', 'INSME', 'SPEME', 'UMLME'
  ];
  displayedColumns2: string[] = ['플랜트', '창고', '자재코드', '자재명', '배치번호',
    'Long배치', '단위', '가용재고', '검사재고', '보류재고', '이전중'
  ];
  dataSource = new MatTableDataSource();
  @ViewChild('paginator') paginator!: MatPaginator;
  
  currentReq: Pp0370Req | undefined = {
    header: {
      zInterfaceId: "GRP_PP0370",
      zConSysId: "KII_CHA",
      zProSysId: "GRP_ECC_PP",
      zUserId: "bbs",
      zPiUser: "IF_KIICHA",
      zTimeId: "20230126103011",
      zLang: ""
    },
    body: {
      twerks: [],
      tlgort: [],
      tmatnr: [],
      tcharg: []
    }
  }
  
  constructor(
    private sapService$: SapApiService,
    private snackBar$ : SnackbarService
  ){
    this.form.controls.plant.setValue('5131');
    this.form.controls.lgorts.setValue('5701');
    this.form.controls.matnrs.setValue('10352688 10402918');
  }
  ngAfterViewInit() {
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
      //console.log('form is invalid');
      this.snackBar$.info("form is invalid!");
      return;
    }

    this.dataSource.data = []
    // 조회조건 clear 
    this.currentReq?.body?.twerks?.splice(0)
    this.currentReq?.body?.tlgort?.splice(0)
    this.currentReq?.body?.tmatnr?.splice(0)
    this.currentReq?.body?.tcharg?.splice(0)
       

    var splitPlant = this.form.get('plant')?.value?.split(' ');
    var splitLgort = this.form.get('lgorts')?.value?.split(' ')
    var splitMatnr = this.form.get('matnrs')?.value?.split(' ');    
    var splitCharg = this.form.get('chargs')?.value?.split(' ');    

    //this.currentReq?.body?.twerks?.push({ werks: plant! })
    splitPlant?.forEach((plant) => {
      this.currentReq?.body?.twerks?.push({ werks: plant })
    })
    splitLgort?.forEach((lgort) => {
      this.currentReq?.body?.tlgort?.push({ lgort: lgort })
    })
    splitMatnr?.forEach((matnr) => {
      this.currentReq?.body?.tmatnr?.push({ matnr: matnr })
    })
    splitCharg?.forEach((charg) => {
      this.currentReq?.body?.tcharg?.push({ charg: charg })
    })
    // const json4 = JSON.stringify(this.currentReq);
    // console.log(json4);

    this.loading$.next(true);
    //var req = this.makeRequestJson();
    let params: HttpParams = new HttpParams();
    params = params.set('enumurl', 0);
    this.sapService$.getSapStock(this.currentReq,params)
      .subscribe({
        next: res => {
          console.log(res.Header);
          console.log(res.Body.STOCK_LIST);
          if(res.Header['ZResultCd']=="S") {
            this.dataSource.data = res.Body.STOCK_LIST;
            this.snackBar$.success("Completed successfully.")
          } else {
            this.snackBar$.error(res.Header['ZResultMsg'])
          }
          
          
        },
        error: err =>{
          console.log(err);
          //this.snackBar$.error(err.error.detail)
          if( typeof err.error === "string" )this.snackBar$.error(err.error);
          else this.snackBar$.error(err.message);
         
          this.loading$.next(false)
        },
        complete:()=>{ this.loading$.next(false)}
    });        
    
  }
}
