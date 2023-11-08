import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';



@Component({
  selector: 'app-android',
  templateUrl: './android.component.html',
  styleUrls: ['./android.component.css']
})
export class AndroidComponent {
  myUrl: string = "http://172.20.105.36:11000/api/File/DownloadFile?fileName=bbb.docx";
  resHtml: any;

  constructor(
    private _http: HttpClient
  ){
    //this.getDocHtml();
  }
  // getDocHtml() {
  //   //this.tempBlob= null;
  //   let params: HttpParams = new HttpParams();
  //   params = params.set('fileName', "bbb.docx")
  //                  .set('subDirectory', "");

  //   this._http.get("https://172.20.105.36:12000/api/File/GetDocHtml", {
  //     params: params,
  //     responseType:'text'
  //   }).subscribe((res) => {
  //     //console.log(res);
  //     this.resHtml=res;
      
  //   });
        

  // }

 
}
