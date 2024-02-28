import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService$ = inject(AuthService);
  
  // Get the auth token from the service.
  //const authToken = authService$.getToken();
  req = addAuthHeader(req);
  // Clone the request and replace the original headers with
  // cloned headers, updated with the authorization.
  // const authReq = req.clone({
  //   headers: req.headers.set('Authorization', authToken)
  // });
  console.log('authInterceptor');
  console.log(req);
  
  return next(req);
  
};

function addAuthHeader(request: HttpRequest<any>) {
  const authService$ = inject(AuthService);

  // Api Server Origin이 아닌 경우의 로직을 추가해야함
  
  // google map에 Authorization token을 넣지 않을려고 하는 로직
  // hostname gives you example.org, // host gives you example.org:8888
  var reqHost = new URL(request.url).origin;

  if(reqHost !== environment.API_BASE_URL) { 
    console.log('outside api');
    return request; 
  }

  if(authService$.isLoggedIn()){
    //console.log('isLoggedIn');
    
    let token = authService$.getToken();
    
    // const authReq = request.clone({
    //   headers: request.headers.set('Authorization',  `Bearer ${token}`)
    // });
    // console.log(authReq);
  
    // return authReq
    return request.clone({
      headers: request.headers.set('Authorization',  `Bearer ${token}`)
    });
  }
  console.log(request);
  
  return request ;
}