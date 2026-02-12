import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAutores } from './registrar-autores';

describe('RegistrarAutores', () => {
  let component: RegistrarAutores;
  let fixture: ComponentFixture<RegistrarAutores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarAutores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarAutores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
