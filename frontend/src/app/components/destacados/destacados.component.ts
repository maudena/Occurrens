import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento.interface';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css'],
  providers: [FilterPipe],
})
export class DestacadosComponent implements OnInit {
  filterEventos = '';
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    public eventoService: EventoService
  ) {}
  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/api/user', {
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
  }
}
