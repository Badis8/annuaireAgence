import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeCardComponent } from './employe-card.component';

describe('EmployeCardComponent', () => {
  let component: EmployeCardComponent;
  let fixture: ComponentFixture<EmployeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
