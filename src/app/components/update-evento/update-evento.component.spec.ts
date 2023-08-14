import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventoComponent } from './update-evento.component';

describe('UpdateEventoComponent', () => {
  let component: UpdateEventoComponent;
  let fixture: ComponentFixture<UpdateEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEventoComponent],
    });
    fixture = TestBed.createComponent(UpdateEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
