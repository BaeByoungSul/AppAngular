import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, finalize, map, switchMap, take, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class Token2Interceptor implements HttpInterceptor {
  private _baseUrl: string = environment.baseUrl;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _loader: LoadingService,
    private _http: HttpClient
  ) {}

  addAuthHeader(request: HttpRequest<any>) {
    // Api Server Origin이 아닌 경우의 로직을 추가해야함
    
    // google map에 Authorization token을 넣지 않을려고 하는 로직
    // hostname gives you example.org, // host gives you example.org:8888
    var reqHost = new URL(request.url).origin;

    if(reqHost !== environment.baseUrl) { 
      console.log('outside api');
      return request; 
    }

    if(this._auth.isLoggedIn()){
      let token = this._auth.getToken();
     
      return request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    console.log(request);
    
    return request ;
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    

    
    // Handle request
    request = this.addAuthHeader(request);
    
    return next.handle(request).pipe( 
      catchError((errordata) => {
        if( errordata.status === 401 ){
          console.log('401');

          // refresh Token이 만기가 되지 않았어면 
          // 새로운 Access Token을 생성해서 request 넣는다.
          if(this._auth.isRefreshTokenValid()){
            console.log('401-RefreshToken is Valid');
            return this.handleRefrehToken(request, next)
          }else {
            this._router.navigate(["/forbidden","401"] );
            //this._router.navigate(['/auth/login'] );
          }
        }else if ( errordata.status === 403 ){
          this._router.navigate(["/forbidden","403"] );
        }
        return throwError(() => errordata );
      }),
      finalize(()=>{
        const profilingMsg = `${request.method} ${request.urlWithParams}`
        this._loader.hide();
        console.log(profilingMsg);        
      })
    );
    



    // return next.handle(request).pipe(
    //   catchError((errordata:any) =>{
    //     return this.handleResponseError(errordata, request, next);
    //   })
    // ) as Observable<HttpEvent<any>>;  // as 부분
  }



  
  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    //let token = this._auth.getToken();
    //let refreshToken =  this._auth.getRefreshToken();
    let refreshToken = JSON.parse( this._auth.getRefreshToken() );
    let params: HttpParams = new HttpParams();
    params = params.set('refreshToken', refreshToken.Token)
                   
    return this._auth.refreshToken( params ).pipe(
      switchMap((data: any) => {
        console.log('switchMap');
        
        console.log(data);
        localStorage.setItem("accessToken", data.AccessToken);
        this._auth.storeAccessToken(data);
        return next.handle(this.addAuthHeader(request))
      }),
      catchError(errodata=>{
        //this._auth.logout(); // 음...
        return throwError(() => errodata)
      })
    );
  }

  intercept_bak(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Handle request
    request = this.addAuthHeader(request);

    if(!this._auth.isLoggedIn()){
      if(this._auth.isRefreshTokenValid()){
        console.log('RefreshToken is Valid');
        let refreshToken = JSON.parse( this._auth.getRefreshToken() );
        let params: HttpParams = new HttpParams();
        params = params.set('refreshToken', refreshToken.Token)

        return this._auth.refreshToken( params ).pipe(
          switchMap((data: any) => {
            console.log('switchMap');
            
            console.log(data);
            localStorage.setItem("accessToken", data.AccessToken);
            this._auth.storeAccessToken(data);
            return next.handle(this.addAuthHeader(request)) 
          }),
          catchError(errodata=>{
            //this._auth.logout(); // 음...
            return throwError(() => errodata)
          }),
          finalize(()=>{
            const profilingMsg = `${request.method} ${request.urlWithParams}`
            this._loader.hide();
            console.log(profilingMsg);        
          })


        );
        
        
        
      }
    }
      return next.handle(request).pipe( 
        catchError((errordata) => {
          if( errordata.status === 401 ){
            console.log('401');
  
            // refresh Token이 만기가 되지 않았어면 
            // 새로운 Access Token을 생성해서 request 넣는다.
            if(this._auth.isRefreshTokenValid()){
              console.log('401-RefreshToken is Valid');
              return this.handleRefrehToken(request, next)
            }else {
              this._router.navigate(["/forbidden","401"] );
              //this._router.navigate(['/auth/login'] );
            }
          }else if ( errordata.status === 403 ){
            this._router.navigate(["/forbidden","403"] );
          }
          return throwError(() => errordata );
        }),
        finalize(()=>{
          const profilingMsg = `${request.method} ${request.urlWithParams}`
          this._loader.hide();
          console.log(profilingMsg);        
        })
      );
    



    // return next.handle(request).pipe(
    //   catchError((errordata:any) =>{
    //     return this.handleResponseError(errordata, request, next);
    //   })
    // ) as Observable<HttpEvent<any>>;  // as 부분
  }

    
}
