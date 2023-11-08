import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../layouts/home-layout/home-layout.component';
import { AngularComponent } from './angular/angular.component';
import { TestFileReaderComponent } from './test-file-reader/test-file-reader.component';
import { AndroidComponent } from './android/android.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { FilePdfViewerComponent } from './file-pdf-viewer/file-pdf-viewer.component';

//const routes: Routes = [];
const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: 'fileview/:id', component: FileViewerComponent},
      { path: 'filepdfview/:id', component: FilePdfViewerComponent},
      { path: 'angular', component: AngularComponent},
      { path: 'android', component: AndroidComponent},
      { path: '', redirectTo: '/study/angular', pathMatch: 'full'}
      
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule { }
