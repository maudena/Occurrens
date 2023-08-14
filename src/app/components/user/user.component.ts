import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Evento } from 'src/app/interfaces/evento.interface';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = {} as User;
  listaEventos: any = [];
  imageUrlPrefix = 'http://localhost:3000/public/';
  isCurrentUserProfile: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        // Se proporcionó un ID de usuario en la ruta, obtener los datos del usuario correspondiente
        this.http
          .get<User>(`http://localhost:3000/api/user/${userId}`, {
            withCredentials: true,
          })
          .subscribe({
            next: (res: any) => {
              this.user = res;
              this.listaEventos = this.user.userEvents;
              this.isCurrentUserProfile = false; // Indicar que el perfil no es del usuario actual
            },
            error: error => {
              console.log(error);
              this.router.navigate(['/login']);
            },
          });
      } else {
        // No se proporcionó ID de usuario, obtener los datos del usuario activo en la sesión
        this.http
          .get<User>('http://localhost:3000/api/user', {
            withCredentials: true,
          })
          .subscribe({
            next: (res: any) => {
              this.user = res;
              this.listaEventos = this.user.userEvents;
            },
            error: error => {
              console.log(error);
              this.router.navigate(['/login']);
            },
          });
      }
    });
  }

  redirectToEventDetails(eventId: string): void {
    this.router.navigate(['/evento', eventId]);
  }
}
