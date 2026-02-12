import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCategoria } from './registrar-categoria';

describe('RegistrarCategoria', () => {
  let component: RegistrarCategoria;
  let fixture: ComponentFixture<RegistrarCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarCategoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
