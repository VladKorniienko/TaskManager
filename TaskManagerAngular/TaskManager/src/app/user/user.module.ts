import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: UserListComponent },
        { path: 'create', component: UserCreateComponent },
        { path: 'update/:id', component: UserUpdateComponent},
        { path: 'delete/:id', component: UserDeleteComponent },
      ])
  ],
  declarations: [UserListComponent,UserCreateComponent, UserUpdateComponent, UserDeleteComponent]
})
export class UserModule { }

 

