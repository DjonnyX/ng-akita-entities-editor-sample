import { TestBed } from '@angular/core/testing';

import { SearchCountriesService } from './search-countries.service';

describe('SearchCountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchCountriesService = TestBed.get(SearchCountriesService);
    expect(service).toBeTruthy();
  });
});
