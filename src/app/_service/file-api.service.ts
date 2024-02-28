import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {
 //private _baseUrl: string = "http://172.20.105.223:11000";
  private _baseUrl: string = environment.API_BASE_URL;
  constructor(
    private http$: HttpClient
  ) { }

  queryInFolder(params: HttpParams): Observable<any>{
    console.log(params);
    console.log(this._baseUrl);
    
    return this.http$.get(`${this._baseUrl}/api/File/QueryInFolder`,{
      params: params
    });
  }
  getDirLists( params: HttpParams):Observable<any>{
    return this.http$.get(`${this._baseUrl}/api/File/GetdirInfo`,{
          params: params
    });
  }
  createFolder(params: HttpParams): Observable<any>{
    console.log(params);
    
    return this.http$.get(`${this._baseUrl}/api/File/CreateFolder`,{
      params: params
    });
  }
  renameFile(params: HttpParams): Observable<any>{
    console.log(params);
    
    return this.http$.put(`${this._baseUrl}/api/File/RenameFile`,{},{
      params: params
    });
  }
  deleteFile(params: HttpParams): Observable<any>{
    console.log(params);
    
    return this.http$.delete(`${this._baseUrl}/api/File/DeleteFile`,{
      params: params
    });
  }
  deleteFolder(params: HttpParams): Observable<any>{
    console.log(params);
    
    return this.http$.delete(`${this._baseUrl}/api/File/DeleteFolder`,{
      params: params
    });
  }
  

  upload(file: any):Observable<any>{
    const formData = new FormData();
    formData.append("formFiles",file,file.name)  
     // Make http post request over api
      // with formData as req
    return this.http$.post(`${this._baseUrl}/api/File/UploadFile`, formData)
  }
  uploadFiles(formData: FormData, params: HttpParams):Observable<any>{
    //const formData = new FormData();
    //formData.append("formFiles",file,file.name)  
     // Make http post request over api
      // with formData as req
    return this.http$.post(`${this._baseUrl}/api/File/UploadFile`, formData,{
          //headers: headers,
          params: params,
          reportProgress: true,
          observe: 'events'
    });
  }

  downloadFile( params: HttpParams){
    return this.http$.get(`${this._baseUrl}/api/File/DownloadFile`, {
      params: params,
      responseType: 'blob',
      observe: 'events',
      reportProgress: true
    });
  }
  downloadFileZip( params: HttpParams){
    return this.http$.get(`${this._baseUrl}/api/File/DownloadFileZip`, {
      params: params,
      responseType: 'blob',
      observe: 'events',
      reportProgress: true
    });
  }
  // pdf 매뉴얼보기에서 사용
  downloadFileBlob( params: HttpParams){
    return this.http$.get(`${this._baseUrl}/api/File/DownloadFile`, {
      params: params,
      responseType: 'blob'
    });
  }

  // mammoth에서 arraybuffer to html
  downloadFileBuffer( params: HttpParams){
    return this.http$.get(`${this._baseUrl}/api/File/DownloadFile`, {
      params: params,
      responseType: 'arraybuffer'
    });
  }
  downloadFileText( params: HttpParams){
    return this.http$.get(`${this._baseUrl}/api/File/DownloadFile`, {
      params: params,
      responseType: 'text'
    });
  }

}
