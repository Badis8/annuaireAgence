import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSliderComponent } from './employee-slider.component';

describe('EmployeeSliderComponent', () => {
  let component: EmployeeSliderComponent;
  let fixture: ComponentFixture<EmployeeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
