import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-test-file-reader',
  templateUrl: './test-file-reader.component.html',
  styleUrls: ['./test-file-reader.component.css']
})

export class TestFileReaderComponent implements OnInit {
  name = "Angular " + VERSION.major;
 // url = 'https://view.officeapps.live.com/op/embed.aspx?src=http://172.20.105.36:11000/api/File/DownloadFile?fileName=ccc.doc';

  urlDoc: string = `https://view.officeapps.live.com/op/embed.aspx?src=https://stackblitz.com/storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdkpMIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e75389b18343665404852ed4cba8bd25938fa9bd/file-sample_1MB.doc`;
  urlxl: string =
    "https://view.officeapps.live.com/op/embed.aspx?src=https://go.microsoft.com/fwlink/?LinkID=521962";

  urlppt: string =
    "https://view.officeapps.live.com/op/embed.aspx?src=  http://www.dickinson.edu/download/downloads/id/1076/sample_powerpoint_slides.pptx";

  urlSafe: SafeResourceUrl | undefined;

  constructor(public sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlDoc);
  }

  selectDocumentType(type: any) {
    switch (type) {
      case "doc":
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlDoc
        );
        break;
      case "xl":
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlxl
        );
        break;
      case "ppt":
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlppt
        );
        break;
      default:
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlDoc
        );
    }
  }

}

