import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewEventoComponent } from './components/new-evento/new-evento.component';
import { UserComponent } from './components/user/user.component';
import { EventoComponent } from './components/evento/evento.component';
import { FilterPipe } from './pipes/filter.pipe';
import { TicketPayrollComponent } from './components/ticket-payroll/ticket-payroll.component';
import { UpdateEventosComponent } from './components/update-eventos/update-eventos.component';
import { UpdateEventoComponent } from './components/update-evento/update-evento.component';
import { EventosComponent } from './components/eventos/eventos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    NewEventoComponent,
    UserComponent,
    EventoComponent,
    FilterPipe,
    TicketPayrollComponent,
    UpdateEventosComponent,
    UpdateEventoComponent,
    EventosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
