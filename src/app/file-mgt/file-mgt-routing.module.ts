import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileDownloadComponent } from './file-download/file-download.component';

const routes: Routes = [
  {
    path:'',
    children:[
      { path: 'file-upload', component: FileUploadComponent },
      { path: 'file-download', component: FileDownloadComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileMgtRoutingModule { }
