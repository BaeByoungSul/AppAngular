import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, fromEvent } from 'rxjs';

export interface WindowSize {
  height: number,
  width: number
};
@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(
    @Inject('windowObject') private window: Window
  ) { 

    fromEvent(window, 'resize')
    .pipe(debounceTime(200) )
    .subscribe((windowSize) => {
      console.log(windowSize)
      //this.windowSizeChanged.next({height: windowSize.currentTarget});
    });

    // fromEvent(window, 'resize')
    // .auditTime(100)
    // .map(event => <WindowSize>{ 
    //   width: event['currentTarget'].innerWidth, 
    //   height: event['currentTarget'].innerHeight
    // })
    // .subscribe((windowSize) => {
    //     this.windowSizeChanged.next(windowSize);
    // })
  }

  readonly windowSizeChanged = new BehaviorSubject<WindowSize>(<WindowSize>{
    width: this.window.innerWidth,
    height: this.window.innerHeight
  });

}
