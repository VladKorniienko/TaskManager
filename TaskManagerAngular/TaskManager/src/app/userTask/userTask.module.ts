import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserTaskCreateComponent } from './user-task-create/user-task-create.component';
import { UserTaskListComponent } from './user-task-list/user-task-list.component';
import { MaterialModule } from '../material/material.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: UserTaskListComponent },
        { path: 'create', component: UserTaskCreateComponent },
        { path: 'userDetails/:id', component: UserDetailsComponent },
        { path: 'taskDetails/:id', component: TaskDetailsComponent },
        
      ])
  ],
  declarations: [UserTaskCreateComponent, UserTaskListComponent, UserDetailsComponent, TaskDetailsComponent]
})
export class UserTaskModule { }
