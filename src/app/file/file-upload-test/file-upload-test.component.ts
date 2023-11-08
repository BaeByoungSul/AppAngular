import { Component } from '@angular/core';
import { FileService } from 'src/app/_service/file.service';

@Component({
  selector: 'app-file-upload-test',
  templateUrl: './file-upload-test.component.html',
  styleUrls: ['./file-upload-test.component.css']
})
export class FileUploadTestComponent {
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File | undefined; // Variable to store file
  myfilename = 'Select File';

  constructor(
    private _fileService:FileService
  ){}
     // On file Select
     onChange(event: any) {
      this.file = event.target.files[0];
    }
 // OnClick of button Upload
 onUpload() {
  this.loading = !this.loading;
  console.log(this.file);
  this._fileService.upload(this.file).subscribe(
      (event: any) => {
          if (typeof (event) === 'object') {

              // Short link via api response
              this.shortLink = event.link;
console.log(event);

              this.loading = false; // Flag variable 
          }
      }
  );
}    
  
}
