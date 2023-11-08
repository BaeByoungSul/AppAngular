import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileRoutingModule } from './file-routing.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import { FileUploadTestComponent } from './file-upload-test/file-upload-test.component';
import { FileListComponent } from './file-list/file-list.component';

import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DirListComponent } from './dir-list/dir-list.component';
import { FileList2Component } from './file-list2/file-list2.component';
import { SelectedFilesComponent } from './selected-files/selected-files.component';
import { ViewFilesComponent } from './view-files/view-files.component';

@NgModule({
  declarations: [
    FileUploadComponent,
    FileDownloadComponent,
    FileUploadTestComponent,
    FileListComponent,
    SelectedFilesComponent,
    ViewFilesComponent,
    DirListComponent,
    FileList2Component
  ],
  imports: [
    CommonModule,
    FileRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCheckboxModule
  ],
  exports:[
    FileUploadComponent,
    FileDownloadComponent
  ]
})
export class FileModule { }
