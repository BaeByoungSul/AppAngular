import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert2Service } from 'src/app/_service/alert2.service';

@Component({
  selector: 'app-alert2',
  templateUrl: './alert2.component.html',
  styleUrls: ['./alert2.component.css']
})
export class Alert2Component implements OnInit, OnDestroy {
  private subscription!: Subscription;
  message: any;
  constructor(private alertService: Alert2Service) { }

  ngOnInit() {
      this.subscription = this.alertService.getMessage().subscribe(message => { 
          this.message = message; 
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
