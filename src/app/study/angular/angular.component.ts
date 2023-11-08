import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/_service/file.service';



@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent implements OnInit {

  myUrl: string = "http://172.20.105.36:11000/api/File/DownloadFile?fileName=bbb.docx";
  //myUrl: string = "https://github.com/Marcelh1983/angular-document-viewer/blob/master/demo/assets/file-sample_100kB.docx";
  myUrlSafe! : SafeResourceUrl;

  docURL : string ="";
  selectedType = 'pdf';
  pdfSrc: any= null;
  //public src!: any;
  @ViewChild('pdfViewer') public pdfViewer: any;
  
  //viewer: viewerType; // google, office, mammoth, pdf, url
  public loadDelay = false;

  htmlStr: string = 'Plain Text Example &amp; <strong>Bold Text Example</strong>';
  
  file: File | undefined; // Variable to store file
  constructor(
    public _sanitizer: DomSanitizer,
    ref: ChangeDetectorRef,
    private _fileService: FileService,
    private _http : HttpClient
  ) {
    
    this.getFile2();

    //this.viewer = 'mammoth';
    //this.myUrlSafe = this._sanitizer.bypassSecurityTrustResourceUrl(this.myUrl);

    setTimeout(() => {
      this.loadDelay = true;
      ref.detectChanges();
    }, 2000);
  }

  ngOnInit() {
    //this.urlSafe = this._sanitizer.bypassSecurityTrustResourceUrl(this.myUrl);
    //this.getFile();
    
  }
  // On file Select
  onChange(event: any) {
    
    //this.parseWordDocxFile(event);
    // mammoth.convertToHtml({path: "assets/bbb.docx"})
    // .then(function(result){
    //     var html = result.value; // The generated HTML
    //     console.log(html);
    //     var messages = result.messages; // Any messages, such as warnings during conversion
    // })
    // .catch(function(error) {
    //     console.error(error);
    // });

    // this.file = event.target.files[0];
    //   console.time();

    // var reader = new FileReader();
    // reader.onloadend = () => {
    //   var mybuffer = reader.result as ArrayBuffer;
    //   mammoth.convertToHtml({ arrayBuffer : mybuffer  }).then(function (resultObject) {
    //     //console.log( resultObject.value);
    //     console.log(resultObject.value)
    //   })
    //   console.timeEnd();
    
    //  }
    
  }

  getFile() {
    //this.tempBlob= null;
    let params: HttpParams = new HttpParams();
    params = params.set('fileName', "bbb.docx")
                   .set('subDirectory', "");

    this._http.get("https://172.20.105.36:12000/api/File/DownloadFile", {
      params: params,
      responseType: 'blob'
    }).subscribe((res) => {
      //var blob = res as Blob;
      //var blob =  new Blob([res], {type: 'application/pdf'});
      const fileReader = new FileReader();
      fileReader.onload = () => {
          this.pdfSrc = new Uint8Array(fileReader.result as ArrayBuffer);
      };
      fileReader.readAsArrayBuffer(res);   
    });
        

  }
  getFile2() {
    //this.tempBlob= null;
    let params: HttpParams = new HttpParams();
    params = params.set('fileName', "aaa.pdf")
                   .set('subDirectory', "");

    this._http.get("https://172.20.105.36:9020/api/File/DownloadFile", {
      params: params,
      responseType: 'blob'
    }).subscribe((res) => {

      this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
      this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf

    });
 
  }
  
  // parseWordDocxFile(inputElement:any) {
  //   var files = inputElement.files || [];
  //   if (!files.length) return;
  //   var file = files[0];

  //   console.time();
  //   var reader = new FileReader();
  //   reader.onloadend = function(event) {
  //     var arrayBuffer = reader.result as ArrayBuffer;
  //     // debugger

  //     mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(function (resultObject) {
  //       //result1.innerHTML = resultObject.value
  //       console.log(resultObject.value)
  //     })
  //     console.timeEnd();

  //     // mammoth.extractRawText({arrayBuffer: arrayBuffer}).then(function (resultObject) {
  //     //   result2.innerHTML = resultObject.value
  //     //   console.log(resultObject.value)
  //     // })

  //     // mammoth.convertToMarkdown({arrayBuffer: arrayBuffer}).then(function (resultObject) {
  //     //   result3.innerHTML = resultObject.value
  //     //   console.log(resultObject.value)
  //     // })
  //   };
  //   reader.readAsArrayBuffer(file);
  // }

}

