import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LogarithmicScale } from 'chart.js';
import { map } from 'rxjs';
import { PP0370_REQ  } from 'src/app/_model/pp0370';
import { LoadingService } from 'src/app/_service/loading.service';
import { SapApiService } from 'src/app/_service/sap-api.service';


@Component({
  selector: 'app-sap-stock',
  templateUrl: './sap-stock.component.html',
  styleUrls: ['./sap-stock.component.css']
})
export class SapStockComponent implements AfterViewInit {

  loading$ = this._loader.loading$;
  @ViewChild('paginator') paginator!: MatPaginator;
  
  form = new FormGroup({
    plant: new FormControl("", Validators.required),
    lgorts: new FormControl("", Validators.required),
    matnrs: new FormControl("")
  });

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['WERKS', 'LGORT', 'MATNR', 'MAKTX', 'CHARG',
    'ZZCHARG', 'MEINS', 'KALAB', 'INSME', 'SPEME', 'UMLME'
  ];
  displayedColumns2: string[] = ['플랜트', '창고', '자재코드', '자재명', '배치번호',
    'Long배치', '단위', '가용재고', '검사재고', '보류재고', '이전중'
  ];

  currentReq: PP0370_REQ | undefined = {
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
      tmatnr: []
    }

  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'; //'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private _http: HttpClient,
    private _loader: LoadingService,
    private _sap: SapApiService,
    private _snackBar : MatSnackBar
    
  ){
    this.form.controls.plant.setValue('5131');
    this.form.controls.lgorts.setValue('5701');
    this.form.controls.matnrs.setValue('10352688 10402918');
  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }
  onSubmit(){
    console.log('submit');
    
    if (this.form.invalid) {
      //console.log('form is invalid');
      this.openSnackBar("form is invalid!", "Error");
      return;
    }

    this.dataSource.data = []
    // 조회조건 clear 
    this.currentReq?.body?.twerks?.splice(0)
    this.currentReq?.body?.tlgort?.splice(0)
    this.currentReq?.body?.tmatnr?.splice(0)
    

    var splitPlant = this.form.get('plant')?.value?.split(' ');
    var splitLgort = this.form.get('lgorts')?.value?.split(' ')
    var splitMatnr = this.form.get('matnrs')?.value?.split(' ');    

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
    
    // const json4 = JSON.stringify(this.currentReq);
    // console.log(json4);

    this._loader.show();
    //var req = this.makeRequestJson();
    let params: HttpParams = new HttpParams();
    params = params.set('enumurl', 0);
    this._sap.getSapStock(this.currentReq,params)
      .subscribe({
        next: res => {
          console.log(res.Header);
          console.log(res.Body.STOCK_LIST);

          this.dataSource.data = res.Body.STOCK_LIST;
          this._loader.hide(); 
        },
        error: err =>{
          console.log(err);
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
  /// response 값이 XML형태 
  onSubmit2(){
    console.log('submit');
    
    if (this.form.invalid) {
      console.log('form is invalid');
      return;
    }
      
    this.dataSource.data = []
    // 조회조건 clear 
    this.currentReq?.body?.twerks?.splice(0)
    this.currentReq?.body?.tlgort?.splice(0)
    this.currentReq?.body?.tmatnr?.splice(0)
    
      

      var splitPlant = this.form.get('plant')?.value?.split(' ');
      var splitLgort = this.form.get('lgorts')?.value?.split(' ')
      var splitMatnr = this.form.get('matnrs')?.value?.split(' ');    

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
      
      const json4 = JSON.stringify(this.currentReq);
      console.log(json4);

      this._loader.show();

      
      //var req = this.makeRequestJson();
      let params: HttpParams = new HttpParams();
      params = params.set('enumurl', 0);
      this._sap.getSapStock2(this.currentReq,params)
        .subscribe((res:any)=>{
          console.log(res);
          var parser, xmlDoc;
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(res, "text/xml");
          var resHeader = xmlDoc.querySelector("Envelope Body MT_GRP_PP0370_Con_response Header")
          var resBody = xmlDoc.querySelectorAll("Envelope Body MT_GRP_PP0370_Con_response Body")
          const resBody2 = resBody.item(0).childNodes 

          // this.dataSource.data = res.Body.STOCK_LIST;
          console.log(resHeader);
          console.log(resBody);
          console.log(resBody2);
          //console.log(new XMLSerializer().serializeToString(resBody2.item(0)));
          
          var result: any[] = []
          resBody2.forEach(item =>{
            
            // item.childNodes.forEach(stock =>{
            //   console.log(stock.nodeName);  
            //   console.log(stock.childNodes[0].nodeValue);
            // })

            //console.log(item.childNodes[0]);
            
            const el = item as Element;
            result.push({
              WERKS: el.getElementsByTagName("WERKS")[0].textContent,
              LGORT: el.getElementsByTagName("LGORT")[0].textContent,
              MATNR: el.getElementsByTagName("MATNR")[0].textContent,
              MAKTX: el.getElementsByTagName("MAKTX")[0].textContent,
              CHARG: el.getElementsByTagName("CHARG")[0].textContent,
              ZZCHARG: el.getElementsByTagName("ZZCHARG")[0].textContent,
              MEINS: el.getElementsByTagName("MEINS")[0].textContent,
              KALAB: el.getElementsByTagName("KALAB")[0].textContent,
              INSME: el.getElementsByTagName("INSME")[0].textContent,
              SPEME: el.getElementsByTagName("SPEME")[0].textContent,
              UMLME: el.getElementsByTagName("UMLME")[0].textContent
            })

          })
   
          this.dataSource.data = result;
          this._loader.hide(); 
        })
      ;
  }
}
