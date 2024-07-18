import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyListWrapperComponent } from './agency-list-wrapper.component';

describe('AgencyListWrapperComponent', () => {
  let component: AgencyListWrapperComponent;
  let fixture: ComponentFixture<AgencyListWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyListWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
