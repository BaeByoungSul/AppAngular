import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { DevTestModule } from '../../dev-test/dev-test.module';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { FileList1Component } from '../../dev-test/_shared/file-list1/file-list1.component';
import { FileList2Component } from '../../dev-test/_shared/file-list2/file-list2.component';
import { DirListComponent } from '../dir-list/dir-list.component';
import { FileApiService } from '../../_service/file-api.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
declare function parseWordDocxFile2(blob: ArrayBuffer): void;

@Component({
  selector: 'app-view-manual',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    DevTestModule,
    MatTabsModule,
    MatGridListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    CdkMenuModule,
    DirListComponent,
    PdfJsViewerModule
  ],
  templateUrl: './view-manual.component.html',
  styleUrl: './view-manual.component.css'
})
export class ViewManualComponent {
  loading$ = new BehaviorSubject<boolean>(false)
  
  queryDirPath : string[] = [];
  dirList: { dirName: string; updated: Date; }[] | undefined | null ;


  allFileList: {fileName: string; fileSize: string;}[] | undefined | null ;
  fileList: {fileName: string; fileSize: string;}[] | undefined | null ;

  filePattern: string[] = ['doc file', 'pdf file', 'text file']
  selectedPattern: string='doc file'
  selectedFile: string =''

  textData: string= ''

  constructor(
    private fileService$:FileApiService,
    private breakpointObserver: BreakpointObserver
  ){

  }
  viewFile(){
    if ( this.selectedPattern == 'doc file') {
      this.viewFileDoc();
    }else if (this.selectedPattern == 'pdf file' ){
      this.viewFilePdf();
    }else if (this.selectedPattern == 'text file' ){
      this.viewFileText();
    }
  }
  @ViewChild('pdfViewer') public pdfViewer: any;
  viewFilePdf(){
    //console.log(this.selectedFile);
    //return;
    this.loading$.next(true);
    let params: HttpParams = new HttpParams();
    params = params.set('fileName', this.selectedFile)
    params = params.set('subDirectory', this.queryDirPath.join('?'));
console.log(params);

    this.fileService$.downloadFileBlob(params) 
    .subscribe({
      next: ( res : any) => {
        console.log(res);
        this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
      },
      error: err =>{
        console.log(err);
        this.loading$.next(false);
        //this.subjectService$.setLoading( false );
      },
      complete: ()=>{this.loading$.next(false);}
    });                      
    
  }
  viewFileDoc(){
    //console.log(this.selectedFile);
    //return;
    
    this.loading$.next(true);
    let params: HttpParams = new HttpParams();
    params = params.set('fileName', this.selectedFile)
    params = params.set('subDirectory', this.queryDirPath.join('?'));

    this.fileService$.downloadFileBuffer(params)      
      .subscribe({
        next: ( res : any) => {
          console.log(res);
          parseWordDocxFile2(res)
        },
        error: err =>{
          console.log(err);
          this.loading$.next(false);
          //this.subjectService$.setLoading( false );
        },
        complete: ()=>{this.loading$.next(false);}
      });                      
                     

  }
  viewFileText(){
    //console.log(this.selectedFile);
    //return;
    this.textData= '';

    let params: HttpParams = new HttpParams();
    params = params.set('fileName', this.selectedFile)
    params = params.set('subDirectory', this.queryDirPath.join('?'));

    this.fileService$.downloadFileText(params)                   
    .subscribe((res)=>{
        console.log(res);
        this.textData = res;
        
    });
  }
  onFilePattern(value: any){
    console.log(value);
    //this.selectedPattern = value;
    this.fileList?.splice(0, this.fileList.length);
console.log(this.selectedPattern);

    if ( this.selectedPattern == 'doc file') {
      this.fileList = this.allFileList?.filter((s)=>{
        return s.fileName.endsWith('.docx') || s.fileName.endsWith('.doc')
      })

    }else if (this.selectedPattern == 'pdf file' ){
      this.fileList = this.allFileList?.filter((s)=>{
        return s.fileName.endsWith('.pdf') 
      })
    }else if (this.selectedPattern == 'text file' ){
      this.fileList = this.allFileList?.filter((s)=>{
        return s.fileName.endsWith('.txt') 
      })
    }
    //this.setMySize();
    //if 
    //this.queryInFolder()
  }
  onFileSelection(event: any) {
    this.selectedFile = event.value;
  }
  // child >> parent
  queryInFolder(serverPath: string[]) {
    console.log(serverPath);
    //this.selection.clear()
    //this.dataSource.data=[];
    //<--reset all items
    this.loading$.next(true);
    let params: HttpParams = new HttpParams();
    params = params.set('queryDirJoin', serverPath.join('?'))
    //params = params.set('fileFilterJoin', '*.doc?*.docx')
    
    
    this.fileService$.queryInFolder(params)
    .subscribe({
      next: (res) =>{
        console.log(res);
        this.queryDirPath = res["queryDirPath"] ?? [];
        this.dirList = res["dirList"];
        this.allFileList = res["fileList"];
        // this.fileList = this.allFileList?.filter((s)=>{
        //   s.fileName.endsWith('doc')
        // })
        console.log(this.allFileList);
        if ( this.selectedPattern == 'doc file') {
          this.fileList = this.allFileList?.filter((s)=>{
            return s.fileName.endsWith('.docx') || s.fileName.endsWith('.doc')
          })
  
        }else if (this.selectedPattern == 'pdf file' ){
          this.fileList = this.allFileList?.filter((s)=>{
            return s.fileName.endsWith('.pdf') 
          })
        }else if (this.selectedPattern == 'text file' ){
          this.fileList = this.allFileList?.filter((s)=>{
            return s.fileName.endsWith('.txt') 
          })
        }
        console.log(this.fileList);
        
      
        //this.dataSource.data = res["fileList"];
        // this.serverfolders = res["queryDirPath"] ?? [];
        // this.listFolder = res["dirList"];
        // this.dataSource.data = res["fileList"]
      },
      error: (err) => {
        console.log(err);
        // this.serverfolders.pop();
        // this.openSnackBar(err.error, "Close");
      },
      complete: () => {
        this.loading$.next(false);
        //this.subjectService$.setLoading(false);
      }
    });

  }
}
