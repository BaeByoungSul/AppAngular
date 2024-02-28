import { Injectable } from '@angular/core';
//import { FileElement } from '../file-manager/model/file-element';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { FileElement } from '../dev-test/_model/file-element';

export interface IFileService {
  add(fileElement: FileElement) : FileElement;
  delete(id: string) : void;
  update(id: string, update: Partial<FileElement>) : void;
  queryInFolder(folderId: string): Observable<FileElement[]>;
  get(id: string): FileElement;
}

@Injectable({
  providedIn: 'root',
  
})
export class FileService implements IFileService {
  private map = new Map<string, FileElement>();
  

  constructor() { }
  clear(){
    this.map.clear();
  }
  add(fileElement: FileElement): FileElement {
    console.log(fileElement);
    
    fileElement.id = uuidv4();
    console.log(fileElement.id);
    
    this.map.set(fileElement.id, this.clone(fileElement));
    return fileElement;
  }
  delete(id: string): void {
    this.map.delete(id);
  }
  update(id: string, update: Partial<FileElement>): void {
    let element = this.map.get(id);
    if(element == undefined ) return;
    element = Object.assign(element, update);
    if(element.id == undefined ) return;
    this.map.set(element.id, element);
  }
  private querySubject!: BehaviorSubject<FileElement[]>;
  queryInFolder(folderId: string): Observable<FileElement[]> {
    const result: FileElement[] = [];
    this.map.forEach((element: FileElement) => {
      if (element.parent === folderId) {
        result.push(this.clone(element));
      }
    });
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();
  }
  get(id: string): FileElement {
    return this.map.get(id)!;
  }
  
  clone(element: FileElement) {
    return JSON.parse(JSON.stringify(element));
  }
}
