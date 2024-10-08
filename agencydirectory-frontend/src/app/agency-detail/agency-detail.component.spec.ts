import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyDetailComponent } from './agency-detail.component';

describe('AgencyDetailComponent', () => {
  let component: AgencyDetailComponent;
  let fixture: ComponentFixture<AgencyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
