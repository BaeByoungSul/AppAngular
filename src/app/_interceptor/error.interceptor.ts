import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router$ = inject(Router);
  
  //return next(req);
  return next(req).pipe(
    catchError((err)=>{
      console.log('CatchError');
      
      //401: Unauthorized ( 유효한 AccessToken이 필요, login 필요 )'
      //403: Forbidden Error( You are not allowed )
      if(err.status === 401){
        router$.navigate(["/home/http-error","401"],{skipLocationChange:true} ); 
      }
      else if (err.status === 403) {
        router$.navigate(["/home/http-error","403"],{skipLocationChange:true} ); 
      }
      //this.router.navigate(['../list'], { relativeTo: this.route }); 
      return throwError(()=> err);
    }),
    finalize(()=>{
      const profilingMsg = `${req.method} ${req.urlWithParams}`
      console.log(profilingMsg);  
    })
  );
};
