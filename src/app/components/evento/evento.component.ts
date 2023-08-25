import { Component, Input, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';
@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  @Input() eventosDestacados: boolean = false;
  listaEventos: Evento[] = [];
  evento: Evento = {} as Evento;
  eventId: any = '';
  filterEventos = '';
  imageUrlPrefix = 'http://localhost:3000/public/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public eventoService: EventoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.http
      .get<User>('http://localhost:3000/api/user', {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          this.authService.setAuthenticated(true);
        },
        error: error => {
          console.log(error);
          this.router.navigate(['/login']);
          this.authService.setAuthenticated(false);
        },
      });

    if (this.eventosDestacados) {
      this.eventoService.getEventos().subscribe({
        next: (data: any) => {
          this.listaEventos = data;
          this.actualizarEventosDestacados();
        },
        error: error => {
          console.log(error);
        },
      });
    } else {
      this.eventoService.getEventoById(this.eventId).subscribe({
        next: data => {
          this.evento = data;
        },
        error: error => {
          console.log(error);
        },
      });
    }
  }
  actualizarEventosDestacados() {
    const eventosDestacados = [...this.listaEventos];
    eventosDestacados.sort((a: any, b: any) => b.interaction - a.interaction);
    const primerosDestacados = eventosDestacados.slice(0, 3);
    this.eventoService.updateDestacados(primerosDestacados);
  }

  redirectToUserProfile(userId: string): void {
    this.router.navigate(['/user', userId]);
  }

  redirectToEventoDetails(eventoId: any): void {
    this.router.navigate([`/evento/${eventoId}`]);
  }

  getMapLink(location: string): string {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  }
}
