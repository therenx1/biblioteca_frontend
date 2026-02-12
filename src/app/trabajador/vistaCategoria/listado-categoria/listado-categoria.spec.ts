import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCategoria } from './listado-categoria';

describe('ListadoCategoria', () => {
  let component: ListadoCategoria;
  let fixture: ComponentFixture<ListadoCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCategoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
