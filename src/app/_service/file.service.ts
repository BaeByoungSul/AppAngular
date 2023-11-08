import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private _baseUrl: string = environment.baseUrl;

  constructor(
    private _http:HttpClient
  ) { }

  upload(file: any):Observable<any>{
    const formData = new FormData();
    formData.append("formFiles",file,file.name)  
     // Make http post request over api
      // with formData as req
    return this._http.post(`${this._baseUrl}/api/File/UploadFile`, formData)
  }
  uploadFiles(formData: FormData, params: HttpParams):Observable<any>{
    //const formData = new FormData();
    //formData.append("formFiles",file,file.name)  
     // Make http post request over api
      // with formData as req
    return this._http.post(`${this._baseUrl}/api/File/UploadFile`, formData,{
          //headers: headers,
          params: params,
          reportProgress: true,
          observe: 'events'
    });
  }
  downloadFile( params: HttpParams){
    return this._http.get(`${this._baseUrl}/api/File/DownloadFile`, {
      params: params,
      responseType: 'blob',
      observe: 'events',
      reportProgress: true
    });
  }
  downloadFile2( params: HttpParams){
    return this._http.get(`${this._baseUrl}/api/File/DownloadFile`, {
      params: params,
      responseType: 'arraybuffer'
    });
  }
  downloadFileBlob( params: HttpParams){
    return this._http.get(`${this._baseUrl}/api/File/DownloadFile`, {
      params: params,
      responseType: 'blob'
    });
  }
  
  getDirLists( params: HttpParams):Observable<any>{
    //const formData = new FormData();
    //formData.append("formFiles",file,file.name)  
     // Make http post request over api
      // with formData as req
    return this._http.get(`${this._baseUrl}/api/File/GetdirInfo`,{
          params: params
    });
  
  }
  
}
