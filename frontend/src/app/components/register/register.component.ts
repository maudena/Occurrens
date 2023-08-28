import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      fullname: '',
      username: '',
      email: '',
      password: '',
      phone: '',
      category: '',
    });
  }

  ValidateEmail = (email: any) => {
    var validRegex =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  submit(): void {
    let user = this.form.getRawValue();

    if (
      user.fullname == '' ||
      user.username == '' ||
      user.email == '' ||
      user.password == '' ||
      user.phone == ''
    ) {
      Swal.fire('Error', 'Por favor complete todos los campos', 'error');
    } else if (!this.ValidateEmail(user.email)) {
      Swal.fire('Error', 'Por favor ingresá un email válido', 'error');
    } else {
      user.category = this.form.get('category')?.value;
      this.http
        .post('http://localhost:3000/api/register', user, {
          withCredentials: true,
        })
        .subscribe({
          next: () => {
            Swal.fire(
              'Excelente!',
              'Te has registrado en Occurrens',
              'success'
            );
            this.router.navigate(['/']);
          },
          error: error => {
            Swal.fire('Error', error.message, 'error');
          },
        });
    }
  }
}
