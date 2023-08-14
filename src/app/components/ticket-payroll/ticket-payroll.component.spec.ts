import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPayrollComponent } from './ticket-payroll.component';

describe('TicketPayrollComponent', () => {
  let component: TicketPayrollComponent;
  let fixture: ComponentFixture<TicketPayrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketPayrollComponent],
    });
    fixture = TestBed.createComponent(TicketPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
