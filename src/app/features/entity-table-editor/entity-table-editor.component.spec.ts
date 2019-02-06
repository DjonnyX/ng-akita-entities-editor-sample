import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTableEditorComponent } from './entity-table-editor.component';

describe('EntityTableEditorComponent', () => {
  let component: EntityTableEditorComponent;
  let fixture: ComponentFixture<EntityTableEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityTableEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityTableEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
