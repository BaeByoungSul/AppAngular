import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { StudyRoutingModule } from './study-routing.module';
import { AngularComponent } from './angular/angular.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer'; // <-- Import PdfJsViewerModule module

import { TestFileReaderComponent } from './test-file-reader/test-file-reader.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component'; 
import { AndroidComponent } from './android/android.component';
import { FilePdfViewerComponent } from './file-pdf-viewer/file-pdf-viewer.component';
//import 'mammoth/mammoth.browser'


@NgModule({
  declarations: [
    AngularComponent,
    TestFileReaderComponent,
    AndroidComponent,
    FileViewerComponent,
    FilePdfViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    StudyRoutingModule,
    PdfJsViewerModule
  ],
  exports:[
    AngularComponent
  ]
})
export class StudyModule { }
