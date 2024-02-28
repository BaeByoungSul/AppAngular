import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FileManagerComponent } from '../_shared/file-manager/file-manager.component';
import { FileElement } from '../_model/file-element';
import { Observable } from 'rxjs';
import { FileService } from '../../_service/file.service';

@Component({
  selector: 'app-file-display1',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FileManagerComponent
  ],
  templateUrl: './file-display1.component.html',
  styleUrl: './file-display1.component.css'
})
export class FileDisplay1Component {
  

  public fileElements: Observable<FileElement[]> | undefined  ;
  currentRoot: FileElement | undefined;
  currentPath: string ='';
  canNavigateUp = false;

  constructor(
    public fileService : FileService
  ){}

  ngOnInit(): void {
    this.fileService.clear();
    const folderA = this.fileService.add({ name: 'Folder A', isFolder: true, parent: 'root' });
    this.fileService.add({ name: 'Folder B', isFolder: true, parent: 'root' });
    this.fileService.add({ name: 'Folder C', isFolder: true, parent: folderA.id });
    this.fileService.add({ name: 'File A', isFolder: false, parent: 'root' });
    this.fileService.add({ name: 'File B', isFolder: false, parent: 'root' });
    this.updateFileElementQuery();
    
  }


  addFolder(folder: { name: string }) {
    this.fileService.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    this.updateFileElementQuery();
  }
  removeElement(element: FileElement) {
    //if(element.id == undefined) return;
    this.fileService.delete(element.id as any);
    this.updateFileElementQuery();
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null as any;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot?.parent!);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.fileService.update(event.element.id as any, { parent: event.moveTo.id });
    this.updateFileElementQuery();
  }

  renameElement(element: FileElement) {
    console.log(element);
    this.fileService.update(element.id as any, { name: element.name });
    this.updateFileElementQuery();
  }


  updateFileElementQuery() {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot?.id ? this.currentRoot.id : 'root');
  }
  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }
}
