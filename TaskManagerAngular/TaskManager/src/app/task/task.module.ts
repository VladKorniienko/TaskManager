import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { TaskCreateComponent } from './task-create/task-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: TaskListComponent },
        { path: 'create', component: TaskCreateComponent },
        { path: 'update/:id', component: TaskUpdateComponent},
        { path: 'delete/:id', component: TaskDeleteComponent }
      ])
  ],
  declarations: [TaskListComponent,TaskCreateComponent, TaskUpdateComponent, TaskDeleteComponent]
})
export class TaskModule { }

 

