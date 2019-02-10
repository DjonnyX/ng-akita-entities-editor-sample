import { TestBed } from '@angular/core/testing';

import { UserCountriesService } from './user-countries.service';

describe('UserCountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCountriesService = TestBed.get(UserCountriesService);
    expect(service).toBeTruthy();
  });
});
