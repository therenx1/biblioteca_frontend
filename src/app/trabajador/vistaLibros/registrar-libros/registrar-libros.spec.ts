import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarLibros } from './registrar-libros';

describe('RegistrarLibros', () => {
  let component: RegistrarLibros;
  let fixture: ComponentFixture<RegistrarLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarLibros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarLibros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
