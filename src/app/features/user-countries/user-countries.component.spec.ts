import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCountriesComponent } from './user-countries.component';

describe('UserCountriesComponent', () => {
  let component: UserCountriesComponent;
  let fixture: ComponentFixture<UserCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
