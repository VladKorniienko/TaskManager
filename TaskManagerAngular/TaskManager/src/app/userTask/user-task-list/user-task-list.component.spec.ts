import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskListComponent } from './user-task-list.component';

describe('UserTaskListComponent', () => {
  let component: UserTaskListComponent;
  let fixture: ComponentFixture<UserTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
