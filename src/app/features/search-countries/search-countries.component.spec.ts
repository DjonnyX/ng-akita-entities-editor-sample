import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCountriesComponent } from './search-countries.component';

describe('SearchCountriesComponent', () => {
  let component: SearchCountriesComponent;
  let fixture: ComponentFixture<SearchCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
