import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAuxiliares } from './gestion-auxiliares';

describe('GestionAuxiliares', () => {
  let component: GestionAuxiliares;
  let fixture: ComponentFixture<GestionAuxiliares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAuxiliares]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAuxiliares);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
