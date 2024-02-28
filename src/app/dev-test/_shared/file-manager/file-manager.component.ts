import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FileElement } from '../../_model/file-element';
import { InputDialogComponent } from '../../../_shared/input-dialog/input-dialog.component';
@Component({
  selector: 'app-file-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule
  ],
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.css'
})
export class FileManagerComponent implements OnChanges {
  @Input() fileElements: FileElement[] | undefined | null ;;
  @Input() canNavigateUp: boolean = false;
  @Input() path: string='';

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedUp = new EventEmitter();

  constructor(public dialog: MatDialog){}
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.fileElements);
    
  }
  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }
  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }
  openNewFolderDialog() {
    //let dialogRef = this.dialog.open(InputDialogComponent);

    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: {dialogTitle: 'Create a new folder', inputTitle: 'Folder Name'}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: FileElement) {
    //let dialogRef = this.dialog.open(InputDialogComponent);
    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: {dialogTitle: 'Rename File', inputTitle: 'rename'}
    });    
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.elementRenamed.emit(element);
      }
    });
  }

  openMenu(event: MouseEvent, element: FileElement, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }
}
