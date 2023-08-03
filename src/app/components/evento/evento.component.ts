import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  evento: Evento = {} as Evento;
  imageUrlPrefix = 'http://localhost:3000/public/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {

    const eventId = this.route.snapshot.paramMap.get('id');

    this.http
    .get(`http://localhost:3000/api/evento/${eventId}`, {
      withCredentials: true,
    })
    .subscribe({
      next: (res: any) => {
        this.evento = res;
        Emitters.authEmitter.emit(true);
      },
      error: (error) => {
        this.router.navigate(["/login"])
        Emitters.authEmitter.emit(false);
      },
    })
  }

  
}
