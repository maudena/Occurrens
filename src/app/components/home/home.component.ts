import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = '';
  listaEventos: any = []
  imageUrlPrefix = 'http://localhost:3000/public/';
 

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}
    
    filterEvento= ""

  ngOnInit(): void {


    this.http
      .get('http://localhost:3000/api/user', {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          this.message = `Hola! ${res.username}`;
          Emitters.authEmitter.emit(true);
        },
        error: (error) => {
          this.router.navigate(["/login"])
          Emitters.authEmitter.emit(false);
        },
      });
    
    
   this.http
      .get('http://localhost:3000/api/eventos',{
        withCredentials: true,
      },)
      .subscribe({
        next: (data) => {
          this.listaEventos = data
          
          Emitters.authEmitter.emit(true);
          return this.listaEventos.evento
        },
        error: (error) => {
          this.message = 'No estas logueado';
          Emitters.authEmitter.emit(false);
        },
      });
    
  }
  
  redirectToUserProfile(userId: string): void {
    this.router.navigate(['/user', userId]);
  }
}
