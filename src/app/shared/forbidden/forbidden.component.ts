import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {
  id: string = ''
  message : string =''
  constructor(
    private _route: ActivatedRoute
  ){ }
  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id') ?? '';
    if (this.id === "400"){
      this.message = 'HTTP Error 400 — Bad Request'
    } else if (this.id === "401"){
      this.message = 'HTTP Error 401 — Unauthorized ( 유효한 AccessToken이 필요 )'
    } else if (this.id === "403"){
      this.message = 'HTTP Error 403 — Forbidden Error( You are not allowed )'
    } else if (this.id === "404"){
      this.message = 'HTTP Error 404 — Page Not Found'
    } else if (this.id === "500"){
      this.message = 'HTTP Error 500 — Internal Error'
    } else if (this.id === "503"){
      this.message = 'HTTP Error 503 — Service Unavailable'
    } else {
      this.message = `HTTP Error ${this.id} — Service Unavailable`
    } 
  }
}
