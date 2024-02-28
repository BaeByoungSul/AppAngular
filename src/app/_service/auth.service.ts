import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { User } from '../_model/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubjectService } from './subject.service';
import { map, take, lastValueFrom } from 'rxjs';
import { ResetPassword } from '../_model/reset-password';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = environment.API_BASE_URL;
  private _accessTokenKey: string = 'accessToken'
  private _refressTokenKey: string = 'refreshToken'
 
  helper = new JwtHelperService();
  currentUser: User = {
    email: '',
    mainRoles: [''],
    roles: ['']
  }
  private _selectedMainRole : string = "";
  private _selectedRole : string = "";

  constructor(
    private http$: HttpClient,
    private router$: Router,
    private loader$: SubjectService
  ){}
//accessToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RBY2Nlc3NUb2tlbiIsImp0aSI6IjM0Mzk2YjU0LTEwM2YtNDg2Yy05MzFlLTNlYTEwYTdmNWQ0YyIsImlhdCI6IjAxLzE5LzIwMjQgMDc6MTI6NTEiLCJuYW1lIjoiYnNiYWUxQGtvbG9uLmNvbSIsImVtYWlsYWRkcmVzcyI6ImJzYmFlMUBrb2xvbi5jb20iLCJtYWluUm9sZXMiOlsiSHVpemhvdSIsIlN1emhvdSIsIlpoYW5nSmlhR2FuZyJdLCJyb2xlIjpbIkFkbWluIiwiVXNlciJdLCJleHAiOjE3MDU2NDg2NzEsImlzcyI6IkpXVEF1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiQXNwTmV0QXBpQ2xpZW50In0.LgBLNxkS4kMyOwhuX5TA8xuD0AmdMzsZs_AasMQed94
  /*
  {
    "sub": "JWTAccessToken",
    "jti": "34396b54-103f-486c-931e-3ea10a7f5d4c",
    "iat": "01/19/2024 07:12:51",
    "name": "bsbae1@kolon.com",
    "emailaddress": "bsbae1@kolon.com",
    "mainRoles": [
      "Huizhou",
      "Suzhou",
      "ZhangJiaGang"
    ],
    "role": [
      "Admin",
      "User"
    ],
    "exp": 1705648671,
    "iss": "JWTAuthenticationServer",
    "aud": "AspNetApiClient"
  }
  */
  login(email:string, password: string){
    const httpOption = {
      headers: new HttpHeaders ({'Content-type': 'application/json'})
    }
    return this.http$
      .post(`${this._baseUrl}/api/Auth/Login`, {email:email, password: password}, httpOption)
      .pipe( 
        map((res:any) =>{
          //console.log(res);

          // jwt access token을 decode 
          const decodedToken = this.helper.decodeToken(res.AccessToken);
          
          // decode 한 token을 읽어서 현재 사용자에 저장
          this.currentUser.email = decodedToken.emailaddress;
          this.currentUser.mainRoles = decodedToken.mainRoles;
          this.currentUser.roles = decodedToken.role;
         //this.currentUser.userHome = res.userHome;
          
          // local Storage에 accessToken및 RefreshToken을 저장 
          localStorage.clear();
          localStorage.setItem(this._accessTokenKey, res.AccessToken);
          localStorage.setItem(this._refressTokenKey, JSON.stringify (res.RefreshToken));
  
          //console.log(JSON.stringify (res.RefreshToken));
         
  //        return this.currentUser; 
          if(this.getMainRoles().length > 1){
            if(this.getMainRoles()[1] == 'Common' || 
               this.getMainRoles()[1] == 'Huizhou'){
              this.setMainRole( this.getMainRoles()[1])
            } else 
              this.setMainRole( this.getMainRoles()[0])
            //this._selectedMainRole = this.getMainRoles()[1];
          } else {
            this.setMainRole( this.getMainRoles()[0])
            //this._selectedMainRole = this.getMainRoles()[0];
          }
          this._selectedRole = this.getRoles()[0];

          return this.currentUser;
        })
      );
  }
  logout(){
    this.currentUser = {
      email: '',
      mainRoles: [''],
      roles: ['']
    }
    this.setMainRole('Common');
    localStorage.clear();
    this.router$.navigate(['/']);
  }
  storeAccessToken(res: any){
    const decodedToken = this.helper.decodeToken(res.AccessToken);
    //const decodedReToken = this.helper.decodeToken(res.RefreshToken);
//console.log(res.RefreshToken);

    //console.log(decodedReToken);
    
    this.currentUser.email = decodedToken.emailaddress;
    this.currentUser.mainRoles = decodedToken.mainRoles;
    this.currentUser.roles = decodedToken.role;
    //this.currentUser.userHome = res.userHome;
    localStorage.setItem(this._accessTokenKey, res.AccessToken);
    
    this._selectedMainRole = this.getMainRoles()[0];
    this._selectedRole = this.getRoles()[0];
  }

  register(user: any) {
    return this.http$.post(`${this._baseUrl}/api/Auth/RegisterUser`, user);
  }
  verifyEmail(email: string, token: string){
    //console.log(token);
    //console.log(email );
    return this.http$.post(`${this._baseUrl}/api/Auth/VerifyEmail`, 
    {
      email: email,
      token: token
    })
  }
  forgotPassword(email: string, resetPasswordUrl: string){
    let params: HttpParams = new HttpParams();
    params = params.set('email', email);
    params = params.set('resetPasswordUrl', resetPasswordUrl);
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: params
    };

    console.log(email );
    return this.http$.post(`${this._baseUrl}/api/Auth/ForgotPassword`, 
       {}, httpOptions )
  }
  resetPassword(resetPass: ResetPassword){
    console.log(resetPass );
    return this.http$
            .post(`${this._baseUrl}/api/Auth/ResetPassword`, resetPass)
  }
  
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !this.helper.isTokenExpired(token);
  }

  isRefreshTokenValid(): boolean {
    const accessToken = this.getToken();
    
    // access Token이 없어면 false
    if(!accessToken) {
      //console.log('false');
      return false;
    } 

    //const refreshToken = this.getRefreshToken();
    const refreshToken = JSON.parse( this.getRefreshToken() );
    const _now = new Date( );
    const _refreshExpires = new Date(refreshToken.Expires)
    //console.log(_now);
    //console.log(_refreshExpires);
    
    
    if(_now < _refreshExpires){
      //console.log('refresh Token Not Expired');
      return true ;
    }else {
      //console.log('refresh Token Expired');
      return false ;
    }
    //return true;
  }
    // Access token이 만료되고 RefreshToken이 유효하면
  // Access Token을 다시 받아서 저장
  refreshAccessToken(){

    // login 상태나 refresh Token이 유효하지 않으면 return;
    if(this.isLoggedIn()) return;
    if(this.isRefreshTokenValid() == false) return;

    // let refreshToken = JSON.parse( this.getRefreshToken() );
    // let params: HttpParams = new HttpParams();
    // params = params.set('refreshToken', refreshToken.Token)

    this.loader$.setLoginRefresh(true);

    let refreshToken = JSON.parse( this.getRefreshToken() );
    let params: HttpParams = new HttpParams();
    params = params.set('refreshToken', refreshToken.Token)
   
    this.http$.get(`${this._baseUrl}/api/Auth/RefreshToken`,{
      params: params
    })
    .subscribe({
      next: res => {
        console.log(res);

        this.storeAccessToken(res);
        this.loader$.setLoginRefresh(false);
        
      },
      error: err =>{
        console.log(err);
        this.loader$.setLoginRefresh(false);
      }
    });

  }
  // async testAsyncFunction(): Promise<any> {
  //   let myUrl = `${this._baseUrl}/WeatherForecast/GetWeatherForecast5`
    
  //   //let refreshToken = JSON.parse( this.getRefreshToken() );
  //   //let params: HttpParams = new HttpParams();
  //   //params = params.set('refreshToken', refreshToken.Token)

  //   //const request$ = this._http.get(myUrl,{params: params}).pipe(take(1));1
  //   const request$ = this.http$.get(myUrl).pipe(take(1));
  //   return await lastValueFrom(request$);
  // }      
  async refreshAccessTokenAsync() {
    if(this.isLoggedIn()) return;
    
    if(!this.isRefreshTokenValid()) return;


    let myUrl = `${this._baseUrl}/api/Auth/RefreshToken`
    
    let refreshToken = JSON.parse( this.getRefreshToken() );
    let params: HttpParams = new HttpParams();
    params = params.set('refreshToken', refreshToken.Token)

    const request$ = this.http$.get(myUrl,{params: params}).pipe(take(1));
    
    await lastValueFrom(request$).then(
            res => { // Success
              console.log(res);
              
              this.storeAccessToken(res);
            },
            msg => { // Error
              console.log(msg);
            }
          );
    
  } 
  public getToken(): string  {
    return localStorage.getItem(this._accessTokenKey) || ''  ;
  }
  public setMainRole(mainRole : string ){
    //console.log(mainRole);
    this._selectedMainRole = mainRole;
    if(mainRole == 'Common'){
      this.router$.navigate(['/']);
    }else if (mainRole == 'Huizhou') {
      this.router$.navigate(['/huizhou']);
    }
    

  }  
  public setRole(role : string ){
    this._selectedRole = role;
  }
  //2023.11.1 : 권한이 하나일 때는 Array로 인식이 되지 않아서 수정함
  getMainRoles(): string[] {
    //console.log(this.currentUser.mainRoles);
    var mainRoles:string[]= ['Common'];
    const decodedToken = this.helper.decodeToken(this.getToken());
    //console.log(decodedToken?.mainRoles);
    if (Array.isArray(decodedToken?.mainRoles)){
      //console.log(decodedToken?.mainRoles);
      (decodedToken?.mainRoles as string[])
        .forEach(e=>{
          mainRoles.push(e);
          //console.log(e);
      });
      //mainRoles.push( decodedToken?.mainRoles as string[]);
      return mainRoles;
      //return decodedToken?.mainRoles || [];  
    }else if(decodedToken?.mainRoles) {
      //this.form.get('plant')?.value?.split(' ');
      //console.log(decodedToken?.mainRoles?.split('^')|| []);
      mainRoles.push( decodedToken?.mainRoles);
      //mainRoles.unshift( decodedToken?.mainRoles);
      return mainRoles;
      //return decodedToken?.mainRoles?.split('^') || [];  
    }else 
      return mainRoles;

    //return decodedToken?.mainRoles || [];
  }

  getRoles(): string[]{
    const decodedToken = this.helper.decodeToken(this.getToken());
    if (Array.isArray(decodedToken?.role)){
      return decodedToken?.role || [];
    }else {
      //this.form.get('plant')?.value?.split(' ');
      return decodedToken?.role?.split('^')|| [];  
    }

    //return decodedToken?.role || [];
  }
  getExpiry(): string {
    
    const token = this.getToken();
    if(token==null || token == '') return '';
    
    //const decodedToken = this.helper.decodeToken(token);

    //console.log(this.helper.getTokenExpirationDate(token));
    var expiredDate  = this.helper.getTokenExpirationDate(token) 
    
    return this.getDateString(expiredDate!);
    
  }
  getExpiryLeftTime(){
    const token = this.getToken();
    if(token==null || token == '') return 0;

    //const decodedToken = this.helper.decodeToken(token);
    //console.log(decodedToken);
    //console.log(Date.now());
    const exp: number | undefined = this.helper.getTokenExpirationDate(token)?.getTime();

    if (exp == undefined) return 0
    const milliDiff = exp - Date.now();

    // Converting time into hh:mm:ss format
    
    // Total number of seconds in the difference
    const totalSeconds = Math.floor(milliDiff / 1000);
 
    // Total number of minutes in the difference
    const totalMinutes = Math.floor(totalSeconds / 60);
    
    // Total number of hours in the difference
    const totalHours = new Intl.NumberFormat('ko-KR',{minimumIntegerDigits:2})
                              .format( Math.floor(totalMinutes / 60));
    
    // Getting the number of seconds left in one minute
    const remSeconds = new Intl.NumberFormat('ko-KR',{minimumIntegerDigits:2})
                              .format( totalSeconds % 60 );
    
    // Getting the number of minutes left in one hour
    const remMinutes = new Intl.NumberFormat('ko-KR',{minimumIntegerDigits:2})
                            .format( totalMinutes % 60 );;

    return `${totalHours}:${remMinutes}:${remSeconds}`;
  }
  public getRefreshToken(): string {
    return localStorage.getItem(this._refressTokenKey) || ''  ;
    
  }
  public getSelectedMainRole(): string{
    return this._selectedMainRole || this.getMainRoles()[0];
    // if( this.isLoggedIn()){
    //   return this._selectedMainRole || this.getMainRoles()[0];
    // }
    // else
    //   return ""
  }
  public getSelectedRole(): string{
    if( this.isLoggedIn())
      return this._selectedRole || this.getRoles()[0];
      
    else
      return "";
  } 
  private getDateString( pDate: Date):string {
    let str = '';

    //const currentTime = new Date();
    const year = pDate.getFullYear();
    var month = pDate.getMonth();
    month = month + 1;
    const day = pDate.getDate();

    const hours = pDate.getHours();
    const minutes = pDate.getMinutes();
    const seconds = pDate.getSeconds();
 
    const paddedMonth: string = `0${month}`.slice(-2);
    const paddedDay: string = `0${day}`.slice(-2);

    const paddedHour: string = `0${hours}`.slice(-2);
    const paddedMinutes: string = `0${minutes}`.slice(-2);
    const paddedSeconds: string = `0${seconds}`.slice(-2);

    
    str = `${year}-${paddedMonth}-${paddedDay} ${paddedHour}:${paddedMinutes}:${paddedSeconds} `
    //str += year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + ' ';

    //console.log(str);
    return str;
  }
}
