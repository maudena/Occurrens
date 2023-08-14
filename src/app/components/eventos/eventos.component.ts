import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from 'src/app/interfaces/evento.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/evento-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  imageUrlPrefix = 'http://localhost:3000/public/';
  listaEventos: Evento[] = [];
  category = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public eventoService: EventoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');

      if (category !== null) {
        this.category = category;
        this.loadEventosByCategoria(this.category);
      } else {
        this.loadAllEventos();
      }
    });

    this.http
      .get('http://localhost:3000/api/user', {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          this.authService.setAuthenticated(true);
        },
        error: error => {
          this.router.navigate(['/login']);
          this.authService.setAuthenticated(false);
        },
      });
  }

  loadEventosByCategoria(category: string) {
    this.http
      .get<Evento[]>(`http://localhost:3000/api/eventos/${category}`, {
        withCredentials: true,
      })
      .subscribe({
        next: data => {
          this.listaEventos = data;
        },
        error: error => {
          console.log(error);
        },
      });
  }

  loadAllEventos() {
    this.http
      .get<Evento[]>('http://localhost:3000/api/eventos', {
        withCredentials: true,
      })
      .subscribe({
        next: data => {
          this.listaEventos = data;
        },
        error: error => {
          console.log(error);
        },
      });
  }

  redirectToEventoDetails(eventoId: any): void {
    this.http
      .get<Evento>(`http://localhost:3000/api/evento/${eventoId}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (data: any) => {
          this.eventoService.updateInteraction(data.interaction);
          this.eventoService.updateEvento(data);
          this.router.navigate([`/evento/${eventoId}`]);
        },
        error: error => {
          console.log('Error al obtener los detalles del evento:', error);
        },
      });
  }
  redirectToUserProfile(userId: string): void {
    console.log(userId);

    this.router.navigate(['/user', userId]);
  }

  getMapLink(location: string): string {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  }
}
