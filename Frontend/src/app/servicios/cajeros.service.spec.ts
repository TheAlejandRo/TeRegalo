import { TestBed } from '@angular/core/testing';

import { CajerosService } from './cajeros.service';

describe('CajerosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CajerosService = TestBed.get(CajerosService);
    expect(service).toBeTruthy();
  });
});
