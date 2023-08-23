import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento.interface';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-proximos-eventos',
  templateUrl: './proximos-eventos.component.html',
  styleUrls: ['./proximos-eventos.component.css'],
})
export class ProximosEventosComponent implements OnInit {
  listaProximos: Evento[] = [];

  constructor(public eventoService: EventoService) {}

  ngOnInit(): void {
    this.eventoService.getEventos().subscribe({
      next: (data: any) => {
        this.listaProximos = data;
        this.ordenarEventosPorFechaDescendente(this.listaProximos);
        this.actualizarEventosProximos();
      },
      error: error => {
        console.log(error);
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

  actualizarEventosProximos() {
    const eventosProximos = [...this.listaProximos];
    eventosProximos.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const primerosProximos = eventosProximos.slice(0, 5);
    this.eventoService.updateProximos(primerosProximos);
  }
}
