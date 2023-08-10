import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventosComponent } from './update-eventos.component';

describe('UpdateEventoComponent', () => {
  let component: UpdateEventosComponent;
  let fixture: ComponentFixture<UpdateEventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEventosComponent]
    });
    fixture = TestBed.createComponent(UpdateEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
