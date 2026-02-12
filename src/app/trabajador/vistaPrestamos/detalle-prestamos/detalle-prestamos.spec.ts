import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePrestamos } from './detalle-prestamos';

describe('DetallePrestamos', () => {
  let component: DetallePrestamos;
  let fixture: ComponentFixture<DetallePrestamos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePrestamos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePrestamos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
