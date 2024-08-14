import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyCreationComponent } from './agency-creation.component';

describe('AgencyCreationComponent', () => {
  let component: AgencyCreationComponent;
  let fixture: ComponentFixture<AgencyCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
