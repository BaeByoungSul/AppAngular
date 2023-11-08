import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileService } from 'src/app/_service/file.service';

@Component({
  selector: 'app-file-pdf-viewer',
  templateUrl: './file-pdf-viewer.component.html',
  styleUrls: ['./file-pdf-viewer.component.css']
})
export class FilePdfViewerComponent {
  id: string | null = "";
  selected: string  = "";
  src: any;
  @ViewChild('pdfViewer') public pdfViewer: any;
  @ViewChild("takePdf") pdfDiv!: ElementRef;
  serverfileInfos: { fileName: string; size: string;}[] = [];

  constructor(
    private _route : ActivatedRoute,
    private _fileService :FileService,
    private _renderer: Renderer2,

  ){

  }
  ngOnInit(): void {
    
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
    this._fileService.downloadFileBlob(params)                   
        .subscribe((res)=>{
            console.log(res);
            //this.src = res;
            this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
            this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
            
        });
  }

  getDirInfo(serverpath: string[]) {
    this.serverfileInfos = [];
    let params: HttpParams = new HttpParams();
    params = params.set('subDirectory', serverpath.join('?'))
                  .set('fileFilter','*.pdf')
    this._fileService.getDirLists(params)
      .subscribe((res: any) => {
        console.log(res);
        this.serverfileInfos = res["fileInfos"];
        this.selected=""
        this.clearDiv();
        
      })
  }
  clearDiv() {
    this.pdfViewer.pdfSrc = ''; // pdfSrc can be Blob or Uint8Array
    this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
return
    let params: HttpParams = new HttpParams();
    params = params.set('fileName', "empty.pdf")
                  .set('subDirectory', "개발공부기록");
    this._fileService.downloadFileBlob(params)                   
    .subscribe((res)=>{
        console.log(res);
        //this.src = res;
        this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf

    });
    //var bytes = new Uint8Array();
    //this.pdfViewer.pdfSrc = bytes.buffer ; // pdfSrc can be Blob or Uint8Array
    //this.pdfViewer.refresh(); 
  }
}
