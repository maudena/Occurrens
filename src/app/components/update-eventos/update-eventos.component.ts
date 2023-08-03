import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import { User } from '../../interfaces/user.interface';
import { Evento } from 'src/app/interfaces/evento.interface';


@Component({
  selector: 'app-update-eventos',
  templateUrl: './update-eventos.component.html',
  styleUrls: ['./update-eventos.component.css']
})
export class UpdateEventosComponent implements OnInit {
  user: User = {} as User;
  listaEventos: any = [];
  imageUrlPrefix = 'http://localhost:3000/public/';
  filterEvento= ""

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.http
          .get<User>('http://localhost:3000/api/user', {
            withCredentials: true,
          })
          .subscribe({
            next: (res: any) => {
              this.user = res;
              this.listaEventos = this.user.userEvents;
              Emitters.authEmitter.emit(true);
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/login']);
              Emitters.authEmitter.emit(false);
            },
          });
  }

  renderUpdateEvento(eventoId:string) : void{
    this.router.navigate(['/update-evento', eventoId]);
  }

  redirectToUserProfile(userId: string): void {
    this.router.navigate(['/user', userId]);
  }

}
