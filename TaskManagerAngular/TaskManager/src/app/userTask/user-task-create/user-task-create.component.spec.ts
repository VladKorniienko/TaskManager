import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskCreateComponent } from './user-task-create.component';

describe('UserTaskCreateComponent', () => {
  let component: UserTaskCreateComponent;
  let fixture: ComponentFixture<UserTaskCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTaskCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
