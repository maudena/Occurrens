import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewEventoComponent } from './components/new-evento/new-evento.component';
import { UserComponent } from './components/user/user.component';
import { EventoComponent } from './components/evento/evento.component';
import { UpdateEventosComponent } from './components/update-eventos/update-eventos.component';
import { UpdateEventoComponent } from './components/update-evento/update-evento.component';
import { EventosComponent } from './components/eventos/eventos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nav', component: NavComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'new-evento', component: NewEventoComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'evento/:id', component: EventoComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'update-eventos', component: UpdateEventosComponent },
  { path: 'update-evento/:id', component: UpdateEventoComponent },
  { path: 'eventos/:category', component: EventosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
