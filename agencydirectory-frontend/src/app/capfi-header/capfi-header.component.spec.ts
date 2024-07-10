import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapfiHeaderComponent } from './capfi-header.component';

describe('CapfiHeaderComponent', () => {
  let component: CapfiHeaderComponent;
  let fixture: ComponentFixture<CapfiHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapfiHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapfiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
