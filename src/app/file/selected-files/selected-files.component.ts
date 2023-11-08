import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selected-files',
  templateUrl: './selected-files.component.html',
  styleUrls: ['./selected-files.component.css']
})
export class SelectedFilesComponent {
  _displayedColumns = ['name', 'type', 'size', 'lastModified'];

  @Input()
  files: File[] = []; 
}
