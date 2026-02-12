import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAutores } from './listado-autores';

describe('ListadoAutores', () => {
  let component: ListadoAutores;
  let fixture: ComponentFixture<ListadoAutores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAutores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoAutores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
