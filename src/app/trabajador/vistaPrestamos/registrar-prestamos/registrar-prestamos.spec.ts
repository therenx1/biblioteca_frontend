import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPrestamos } from './registrar-prestamos';

describe('RegistrarPrestamos', () => {
  let component: RegistrarPrestamos;
  let fixture: ComponentFixture<RegistrarPrestamos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPrestamos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPrestamos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
