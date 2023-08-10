import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { Evento } from 'src/app/interfaces/evento.interface';
declare var navigator: any;
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
        error: (error) => {
          this.router.navigate(['/login']);
          this.authService.setAuthenticated(false);
        },
      });

    this.http
      .get<Evento[]>('http://localhost:3000/api/eventos', {
        withCredentials: true,
      })
      .subscribe({
        next: (data) => {
          this.listaEventos = data;
          this.listaProximosEventos = [...this.listaEventos];
          this.ordenarEventosPorFechaDescendente(this.listaProximosEventos);
          this.actualizarEventosDestacados();
          this.actualizarEventosProximos();
        },
        error: (error) => {
          this.message = 'No estas logueado';
        },
      });
  }

  actualizarEventosDestacados() {
    const eventosDestacados = [...this.listaEventos];
    eventosDestacados.sort((a: any, b: any) => b.interaction - a.interaction); // Ordenar en orden descendente por interacción
    const primerosDestacados = eventosDestacados.slice(0, 3); // Obtener los primeros 3 eventos destacados
    this.eventoService.updateDestacados(primerosDestacados);
  }

  actualizarEventosProximos() {
    const eventosProximos = [...this.listaEventos];
    eventosProximos.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    ); // Ordenar en orden ascendente por fecha
    const primerosProximos = eventosProximos.slice(0, 5); // Obtener los primeros 5 eventos próximos
    this.eventoService.updateProximos(primerosProximos);
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
        error: (error) => {
          console.log('Error al obtener los detalles del evento:', error);
        },
      });
  }

  ordenarEventosPorFechaDescendente(eventos: any[]) {
    eventos.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateA.getTime() - dateB.getTime();
    });
  }

  redirectToUserProfile(userId: string): void {
    this.router.navigate(['/user', userId]);
  }

  getMapLink(location: string): string {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  }
}
