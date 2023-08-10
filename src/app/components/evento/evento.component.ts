import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/evento-service.service';
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
    private route: ActivatedRoute,
    private eventoService: EventoService
  ){}


  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    const cachedEvento = this.eventoService.getEvento();

    if (cachedEvento && cachedEvento._id === eventId) {
      this.evento = cachedEvento;
    } else {
      this.http
        .get(`http://localhost:3000/api/evento/${eventId}`, {
          withCredentials: true,
        })
        .subscribe({
          next: (data: any) => {
            this.evento = data;
            this.eventoService.updateEvento(data);
          },
          error: (error) => {
            console.log('Error al obtener los detalles del evento:', error);
          },
        });
    }
  }
  
  getMapLink(location: string): string {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  }
}
