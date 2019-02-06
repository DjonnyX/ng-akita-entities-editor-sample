import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [ApiService],
      imports: [HttpClientModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
