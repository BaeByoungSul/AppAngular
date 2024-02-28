import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// 컴포넌트 간 통신을 데이터 전달을 위해서 subject사용
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private _iconMenuClick = new Subject<boolean>();
  private _loginRefresh = new Subject<boolean>();
  private _intervalRefresh = new Subject<boolean>();
  private _contentResize = new Subject<{width: number, height:number}>();

  public contentWidth : number = 100;
  public contentHeight: number = 100;

  iconMenuClicked$ = this._iconMenuClick.asObservable();
  isLoginRefreshing$ = this._loginRefresh.asObservable();
  isIntervalRefreshing$ = this._intervalRefresh.asObservable();
  isContentResizing$ = this._contentResize.asObservable();


  constructor() { }

  sendIconMenuClick(event:boolean){
    this._iconMenuClick.next(event);
  }
  setLoginRefresh(event: boolean){
    this._loginRefresh.next(event);
  }
  setIntervalRefresh(event: boolean){
    this._intervalRefresh.next(event);
  }
  sendResizeEvent(event: {width: number, height:number}){
    this._contentResize.next(event);
  }
 
  
  // getEvent():Observable<any> {
  //   return this._subject.asObservable();
  // }
}
