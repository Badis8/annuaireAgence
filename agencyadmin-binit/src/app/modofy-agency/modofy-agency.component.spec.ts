import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModofyAgencyComponent } from './modofy-agency.component';

describe('ModofyAgencyComponent', () => {
  let component: ModofyAgencyComponent;
  let fixture: ComponentFixture<ModofyAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModofyAgencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModofyAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
