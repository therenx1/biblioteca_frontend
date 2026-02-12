import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPrestamos } from './listado-prestamos';

describe('ListadoPrestamos', () => {
  let component: ListadoPrestamos;
  let fixture: ComponentFixture<ListadoPrestamos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPrestamos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPrestamos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
