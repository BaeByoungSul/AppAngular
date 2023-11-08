import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileService } from 'src/app/_service/file.service';
import { environment } from 'src/environments/environment';
// declare function greet(): void;
declare function parseWordDocxFile2(blob: ArrayBuffer): void;
declare function myConvertToHtml(blob: ArrayBuffer): string;

//declare function parseWordDocxFile(): void;

declare var name: any;

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnInit {
  private _baseUrl: string = environment.baseUrl;
  @ViewChild("takeHtml") htmlDiv!: ElementRef;
  //@ViewChild("takeInput", {static: false})InputVar!: ElementRef;

  id: string | null = "";
  serverfileInfos: { fileName: string; size: string;}[] = [];
  selectedFilename: string | undefined;
  //myUrl: string =  "https://172.20.105.36:9020/api/File/DownloadFile?fileName=bbb.docx";
  //myUrl: string =  "http://172.20.105.36:11000/api/File/DownloadFile?fileName=bbb.docx?subDirectory=개발공부기록:Android";
  //myUrl: string =  `${this._baseUrl}/api/File/DownloadFile?fileName=AndoridStudio시작및 배포.docx&subDirectory=개발공부기록:Android`;
  myUrl: string =  `${this._baseUrl}/api/File/DownloadFile?`;
  htmlStr: string = ''

  constructor(
    private _route: ActivatedRoute,
    private _fileService: FileService,
    private _renderer: Renderer2,
    private _http: HttpClient

  ){
    this.myUrl.concat("fileName=AndoridStudio시작및 배포.docx:subDirectory=개발공부기록?Android")
    //greet();
  }

  ngOnInit(): void {
    console.log('OnInit');
    
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')

      var serverpath:string[] = [] 
      if(this.id == "android"){
        serverpath = new Array("개발공부기록","Android") 
      }else if(this.id == "angular"){
        serverpath = new Array("개발공부기록","Angular") 
      }else if(this.id == "netapi"){
        serverpath = new Array("개발공부기록","Api") 
      }else if(this.id == "wcf"){
        serverpath = new Array("개발공부기록","WCF") 
      }else if(this.id == "xamarin"){
        serverpath = new Array("개발공부기록","Xamarin") 
      }
      this.getDirInfo( serverpath );
    })

  }
  onFileSelection(event: any) {
    //`${this._baseUrl}/api/File/DownloadFile`
    console.log(event.value);

    let params: HttpParams = new HttpParams();
    var fileName :string = event.value

    var subDirectory :string = "개발공부기록?"
    if(this.id == "android"){
      subDirectory = subDirectory +"Android";
    }else if(this.id == "angular"){
      subDirectory = subDirectory +"Angular";
    }else if(this.id == "netapi"){
      subDirectory = subDirectory +"Api";
    }else if(this.id == "wcf"){
      subDirectory = subDirectory +"WCF";
    }else if(this.id == "xamarin"){
      subDirectory = subDirectory +"Xamarin";
    }
    //console.log(this.id);
    //console.log(subDirectory);
    
    params = params.set('fileName', fileName)
                   .set('subDirectory', subDirectory);
    this._fileService.downloadFile2(params)                   
        .subscribe((res)=>{
            console.log(res);
            parseWordDocxFile2(res)
            
            //console.log('dddddddd');
            //this.htmlStr= myConvertToHtml(res)
            //console.log(this.htmlStr);
            
            //console.log('aaaaaa' );
            
        });
  }

  getDirInfo(serverpath: string[]) {

    let params: HttpParams = new HttpParams();
    params = params.set('subDirectory', serverpath.join('?'))
                  .set('fileFilter','*.docx,*.doc')
    this._fileService.getDirLists(params)
      .subscribe((res: any) => {
        console.log(res);
        this.serverfileInfos = res["fileInfos"];
        this.clearDiv();
        // this.dataSource.data = res["fileInfos"];
        // this.folders = res["subDirNames"];
        // this.serverfolders = res["dirPathArray"] ?? [];
        // this.getDirInfoEvent.emit(res);
       
        
      })
  }
  clearDiv() {
    let valueYouWantToPut = "";
    this._renderer.setProperty(this.htmlDiv.nativeElement, 'innerHTML', valueYouWantToPut)
  }
  onFileSelectionTest(event: any) {
    //`${this._baseUrl}/api/File/DownloadFile`
    console.log(event);


    let params: HttpParams = new HttpParams();
    var fileName :string = "bbb.docx"
    var subDirectory :string = "개발공부기록?Android"
    
    params = params.set('fileName', fileName)
                   .set('subDirectory', subDirectory);

    // this._http.get("https://172.20.105.36:12000/api/File/DownloadFile", {
    //                 params: params,
    //                 responseType: 'arraybuffer'
    //               })
    //               .subscribe(res => {
    //                 console.log(res);
    //                 parseWordDocxFile2(res)
    //               });

    this._fileService.downloadFile2(params)                   
        .subscribe((res)=>{
            console.log(res);
            parseWordDocxFile2(res)
        });
  }

}


