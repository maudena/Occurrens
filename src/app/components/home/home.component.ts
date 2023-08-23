import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { AuthService } from 'src/app/services/auth.service';
import { Evento } from 'src/app/interfaces/evento.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = '';
  listaEventos: Evento[] = [];
  listaProximosEventos: Evento[] = [];
  imageUrlPrefix = 'http://localhost:3000/public/';
  filterEvento = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    public eventoService: EventoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/api/user', {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          this.message = `Hola! ${res.username}`;
          this.authService.setAuthenticated(true);
        },
        error: error => {
          this.router.navigate(['/login']);
          this.authService.setAuthenticated(false);
        },
      });
  }

  redirectToEventoDetails(eventoId: string): void {
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
