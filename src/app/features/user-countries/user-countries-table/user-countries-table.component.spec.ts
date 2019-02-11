import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCountriesTableComponent } from './user-countries-table.component';

describe('UserCountriesTableComponent', () => {
  let component: UserCountriesTableComponent;
  let fixture: ComponentFixture<UserCountriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCountriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCountriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
