import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPrincipal } from './vista-principal';

describe('VistaPrincipal', () => {
  let component: VistaPrincipal;
  let fixture: ComponentFixture<VistaPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaPrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPrincipal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
