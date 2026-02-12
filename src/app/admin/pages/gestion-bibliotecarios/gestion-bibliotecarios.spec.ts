import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBibliotecarios } from './gestion-bibliotecarios';

describe('GestionBibliotecarios', () => {
  let component: GestionBibliotecarios;
  let fixture: ComponentFixture<GestionBibliotecarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBibliotecarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBibliotecarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
