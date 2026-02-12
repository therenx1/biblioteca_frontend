import { TestBed } from '@angular/core/testing';

import { EstadoLibro } from './estado-libro';

describe('EstadoLibro', () => {
  let service: EstadoLibro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoLibro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
