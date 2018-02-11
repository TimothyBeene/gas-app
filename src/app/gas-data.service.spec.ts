import { TestBed, inject } from '@angular/core/testing';

import { GasDataService } from './gas-data.service';

describe('GasDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GasDataService]
    });
  });

  it('should be created', inject([GasDataService], (service: GasDataService) => {
    expect(service).toBeTruthy();
  }));
});
