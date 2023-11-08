import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, lastValueFrom, map, take } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResetPassword, User, UserResister } from '../_model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _baseUrl: string = environment.baseUrl;
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

  
  //accessTokenKey : 'accessToken',
  //reTokenKey : 'reToken'

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  // return Observable<>
  login(email: string, password: string){
    const httpOption = {
      headers: new HttpHeaders ({'Content-type': 'application/json'})
    }

    return this._http
      .post(`${this._baseUrl}/api/Auth/Login`, {email:email, password: password}, httpOption)
      .pipe( map( (res: any) =>{
        console.log(res);
        const decodedToken = this.helper.decodeToken(res.AccessToken);
        //const decodedReToken = this.helper.decodeToken(res.RefreshToken);
//console.log(res.RefreshToken);
        //console.log(decodedReToken);
       
        this.currentUser.email = decodedToken.emailaddress;
        this.currentUser.mainRoles = decodedToken.mainRoles;
        this.currentUser.roles = decodedToken.role;
        this.currentUser.userHome = res.userHome;
       
        localStorage.clear();
        localStorage.setItem(this._accessTokenKey, res.AccessToken);
        localStorage.setItem(this._refressTokenKey, JSON.stringify (res.RefreshToken));

        console.log(JSON.stringify (res.RefreshToken));
       
//        return this.currentUser; 
        this._selectedMainRole = this.getMainRoles()[0];
        this._selectedRole = this.getRoles()[0];

        return this.currentUser;
      }));
  }

  logout() {
    this.currentUser = {
      email: '',
      mainRoles: [''],
      roles: ['']
    }
    localStorage.clear();
    this._router.navigate(['/']);
  }

  storeAccessToken(res: any){
    console.log(res);
    
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
  register(user: UserResister) {
    //console.log(user);

    return this._http.post(`${this._baseUrl}/api/Auth/RegisterUser`, user);
  }
  
  verifyEmail(email: string, token: string){
    console.log(token);
    console.log(email );
    return this._http.post(`${this._baseUrl}/api/Auth/VerifyEmail`, 
    {
      email: email,
      token: token
    })
  }
  forgotPassword(email: string){
    let params: HttpParams = new HttpParams();
    params = params.set('email', email);
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: params
    };

    console.log(email );
    return this._http.post(`${this._baseUrl}/api/Auth/ForgotPassword`, 
       {}, httpOptions )
  }
  resetPassword(resetPass: ResetPassword){
    console.log(resetPass );
    return this._http
            .post(`${this._baseUrl}/api/Auth/ResetPassword`, resetPass)
  }
  
  refreshToken(params: HttpParams){
   
//console.log(token);
//console.log(refreshToken);

    return this._http.get(`${this._baseUrl}/api/Auth/RefreshToken`,{
      params: params
    });

    // return this._http
    //   .get(`${this._baseUrl}/api/Auth/RefreshToken`,
    //       { refreshToken: refreshToken }, httpOptions);
      
  }
  
  // Access token이 만료되고 RefreshToken이 유효하면
  // Access Token을 다시 받아서 저장
  refreshAccessToken(){

    let refreshToken = JSON.parse( this.getRefreshToken() );
    let params: HttpParams = new HttpParams();
    params = params.set('refreshToken', refreshToken.Token)

console.log(refreshToken.Token);

    // login 상태나 refresh Token이 유효하지 않으면 return;
    if(this.isLoggedIn()) return;
    if(!this.isRefreshTokenValid()) return;

    // let refreshToken = JSON.parse( this.getRefreshToken() );
    // let params: HttpParams = new HttpParams();
    // params = params.set('refreshToken', refreshToken.Token)
    
    this._http.get(`${this._baseUrl}/api/Auth/RefreshToken`,{
      params: params
    })
    .subscribe({
      next: res => {
        console.log(res);

        this.storeAccessToken(res);
        
      },
      error: err =>{
        console.log(err);
        
      }
    });

  }
  async testAsyncFunction(): Promise<any> {
    let myUrl = `${this._baseUrl}/WeatherForecast/GetWeatherForecast5`
    
    //let refreshToken = JSON.parse( this.getRefreshToken() );
    //let params: HttpParams = new HttpParams();
    //params = params.set('refreshToken', refreshToken.Token)

    //const request$ = this._http.get(myUrl,{params: params}).pipe(take(1));1
    const request$ = this._http.get(myUrl).pipe(take(1));
    return await lastValueFrom(request$);
  }      
  async refreshAccessTokenAsync() {
    if(this.isLoggedIn()) return;
    if(!this.isRefreshTokenValid()) return;

    let myUrl = `${this._baseUrl}/api/Auth/RefreshToken`
    
    let refreshToken = JSON.parse( this.getRefreshToken() );
    let params: HttpParams = new HttpParams();
    params = params.set('refreshToken', refreshToken.Token)

    const request$ = this._http.get(myUrl,{params: params}).pipe(take(1));1
    
    await lastValueFrom(request$).then(
            res => { // Success
              this.storeAccessToken(res);
            },
            msg => { // Error
              console.log(msg);
            }
          );
    
  } 

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !this.helper.isTokenExpired(token);
  }

  isRefreshTokenValid(): boolean {
    const accessToken = this.getToken();
    
    // access Token이 없어면 false
    if(!accessToken) {
      console.log('false');
      return false;
    } 

    //const refreshToken = this.getRefreshToken();
    const refreshToken = JSON.parse( this.getRefreshToken() );
    const _now = new Date( );
    const _refreshExpires = new Date(refreshToken.Expires)
    console.log(_refreshExpires);
    console.log(_now);
    
    if(_now < _refreshExpires){
      console.log('refresh Token Not Expired');
      return true ;
    }else {
      return false ;
    }



    




    //return true;
  }

  // public saveTokens(tokendata: any) {
  //   console.log(tokendata);
    
  //   localStorage.setItem(this._accessTokenKey, tokendata.AccessToken);
  //   localStorage.setItem(this._refressTokenKey, tokendata.RefreshToken.Token);
  // }

  public setMainRole(mainRole : string ){
    //console.log(mainRole);
    this._selectedMainRole = mainRole;
  }  
  public setRole(role : string ){
    this._selectedRole = role;
  }
  public getSelectedMainRole(): string{
    if( this.isLoggedIn())
      return this._selectedMainRole || this.getMainRoles()[0];
      
    else
      return ""
  }
  public getSelectedRole(): string{
    if( this.isLoggedIn())
      return this._selectedRole || this.getRoles()[0];
      
    else
      return "";
  }  
  // get user jwt token
  public getToken(): string  {
    return localStorage.getItem(this._accessTokenKey) || ''  ;
    
    
  }

  //2023.11.1 : 권한이 하나일 때는 Array로 인식이 되지 않아서 수정함
  getMainRoles(): string[] {
    //console.log(this.currentUser.mainRoles);
    const decodedToken = this.helper.decodeToken(this.getToken());
    //console.log(decodedToken?.mainRoles);
    if (Array.isArray(decodedToken?.mainRoles)){
      console.log(decodedToken?.mainRoles || []  );
      
      return decodedToken?.mainRoles || [];  
    }else {
      //this.form.get('plant')?.value?.split(' ');
      //console.log(decodedToken?.mainRoles?.split('^')|| []);
      
      return decodedToken?.mainRoles?.split('^')|| [];  
    }

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
  public getRefreshToken(): string {
    return localStorage.getItem(this._refressTokenKey) || ''  ;
    
  }
  // public getRefreshToken2(): any {
  //   //return localStorage.getItem(this._reTokenKey) || ''  ;
  //   return   this._local.getData("reToken2") || '' ;
  // }
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
