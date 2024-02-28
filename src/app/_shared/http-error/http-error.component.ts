import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-http-error',
  standalone: true,
  imports: [],
  templateUrl: './http-error.component.html',
  styleUrl: './http-error.component.css'
})
export class HttpErrorComponent {
  id: string = ''
  message : string =''

  constructor(
    private route$:ActivatedRoute
  ){}
  ngOnInit(): void {

    this.id = this.route$.snapshot.paramMap.get('id') ?? '';
    console.log(this.id);
    
    if (this.id === "400"){
      this.message = 'HTTP Error 400 — Bad Request'
    } else if (this.id === "401"){
      this.message = 'HTTP Error 401 — Unauthorized ( AccessToken이 필요 )'
    } else if (this.id === "403"){
      this.message = 'HTTP Error 403 — Forbidden Error( You are not allowed(유효한 권한필요) )'
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
