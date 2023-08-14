import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user.interface';
@Component({
  selector: 'app-new-evento',
  templateUrl: './new-evento.component.html',
  styleUrls: ['./new-evento.component.css'],
})
export class NewEventoComponent implements OnInit {
  form: FormGroup;
  selectedImage: File | null;
  isChecked: boolean = false;
  user: User = {} as User;
  listaEventos: any = [];

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: '',
      description: '',
      date: '',
      location: '',
      image: '',
      ticket: this.isChecked,
      ticketPrice: '',
      availableTickets: '',
      category: '',
    });
    this.getUserData();
  }

  fileChosen(event: any): void {
    this.selectedImage = event.target.files[0] as File;
  }

  submit(): void {
    let evento = this.form.getRawValue();

    if (
      evento.name == '' ||
      evento.description == '' ||
      evento.ticketPrice == '' ||
      evento.availableTickets == '' ||
      evento.category == ''
    ) {
      Swal.fire('Error', 'Por favor complete todos los campos', 'error');
    } else {
      const formData = new FormData();
      formData.append('name', evento.name);
      formData.append('description', evento.description);
      formData.append('date', evento.date);
      formData.append('location', evento.location);
      formData.append('ticket', evento.ticket);
      formData.append('ticketPrice', evento.ticketPrice);
      formData.append('availableTickets', evento.availableTickets);
      formData.append('category', evento.category);
      formData.append('image', this.selectedImage || '');

      this.http
        .post('http://localhost:3000/api/new-evento', formData, {
          withCredentials: true,
        })
        .subscribe({
          next: () => {
            Swal.fire('Excelente!', 'Se ha creado un nuevo evento!', 'success');
            this.getUserData();
            this.router.navigate(['/']);
          },
          error: error => {
            Swal.fire('Error', error.message, 'error');
          },
        });
    }
  }

  getUserData(): void {
    this.http
      .get<User>('http://localhost:3000/api/user', {
        withCredentials: true,
      })
      .subscribe({
        next: (res: User) => {
          this.user = res;
          console.log(res);
          this.listaEventos = this.user.userEvents;
        },
        error: error => {
          this.router.navigate(['/login']);
        },
      });
  }
}
