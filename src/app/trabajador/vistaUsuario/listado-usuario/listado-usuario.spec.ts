import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsuario } from './listado-usuario';

describe('ListadoUsuario', () => {
  let component: ListadoUsuario;
  let fixture: ComponentFixture<ListadoUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
