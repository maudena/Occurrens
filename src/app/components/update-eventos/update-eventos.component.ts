import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Evento } from 'src/app/interfaces/evento.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-eventos',
  templateUrl: './update-eventos.component.html',
  styleUrls: ['./update-eventos.component.css'],
})
export class UpdateEventosComponent implements OnInit {
  user: User = {} as User;
  listaEventos: Evento[] = [];
  imageUrlPrefix = 'http://localhost:3000/public/';
  filterEvento = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location
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
          this.authService.setAuthenticated(true);
        },
        error: error => {
          console.log(error);
          this.authService.setAuthenticated(false);
          this.router.navigate(['/login']);
        },
      });
  }

  eliminarEvento(eventId: any) {
    this.http
      .delete(`http://localhost:3000/api/delete-evento/${eventId}`)
      .subscribe({
        next: () => {
          Swal.fire(
            'Excelente!',
            'Se ha eliminado el evento seleccionado!',
            'success'
          );
          this.router.navigate(['/']);
        },
        error: error => {
          console.log(error);
        },
      });
  }

  getMapLink(location: string): string {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  }

  renderUpdateEvento(eventoId: string): void {
    this.router.navigate(['/update-evento', eventoId]);
  }

  redirectToUserProfile(userId: string): void {
    this.router.navigate(['/user', userId]);
  }
}
