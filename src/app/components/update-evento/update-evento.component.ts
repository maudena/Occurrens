import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Emitters } from 'src/app/emitters/emitter';
import { Evento } from 'src/app/interfaces/evento.interface';
import { User } from 'src/app/interfaces/user.interface';
@Component({
  selector: 'app-update-evento',
  templateUrl: './update-evento.component.html',
  styleUrls: ['./update-evento.component.css']
})
export class UpdateEventoComponent implements OnInit {
  form: FormGroup
  selectedImage: File | null;
  isChecked : boolean = false
  evento: Evento = {} as Evento;
  user: User = {} as User;
  listaEventos: any = [];
  eventId: string

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.http
    .get(`http://localhost:3000/api/evento/${this.eventId}`, {
      withCredentials: true,
    })
    .subscribe({
      next: (res: any) => {
        this.evento = res;
        Emitters.authEmitter.emit(true);
      },
      error: (error) => {
        this.router.navigate(["/login"])
        Emitters.authEmitter.emit(false);
      },
    })

    this.form = this.formbuilder.group({
      name: "",
      description: "",
      date: "",
      location: "",
      image: "",
      ticket: this.isChecked,
      ticketPrice: "",
      availableTickets: "",
      category:"",
    })
    this.getUserData();

    this.eventId = this.route.snapshot.paramMap.get('id') ?? "" ;
    
  }

  fileChosen(event: any): void {
    this.selectedImage = event.target.files[0] as File;
  }

  submit(): void {
    let evento = this.form.getRawValue();

    if (
      evento.name == "" ||
      evento.description == "" ||
      evento.ticketPrice == "" ||
      evento.availableTickets == "" ||
      evento.category == ""
    ) {
      Swal.fire("Error", "Por favor complete todos los campos", "error");
    } else{
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

      
      
      this.http.put(`http://localhost:3000/api/update-evento/${this.eventId}`, formData, {
        withCredentials: true,
      }).subscribe({
        next: () => {
          Swal.fire("Excelente!", "Se ha creado un nuevo evento!", "success");
          this.getUserData();
          this.router.navigate(["/"]);
        },
        error: (error) => {
          Swal.fire("Error", error.message, "error");
        }
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
          this.listaEventos = this.user.userEvents; 
        },
        error: (error) => {
          this.router.navigate(['/login']);
        },
      });
  }

}
