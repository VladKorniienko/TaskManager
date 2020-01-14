import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksUpdateComponent } from './tasks-update.component';

describe('TasksUpdateComponent', () => {
  let component: TasksUpdateComponent;
  let fixture: ComponentFixture<TasksUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
