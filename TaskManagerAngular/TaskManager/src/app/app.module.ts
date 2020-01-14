import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { HomeComponent } from './home/home.component';
import { RepositoryService } from './shared/services/repository.service';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MAT_DIALOG_DATA} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkColumnDef } from '@angular/cdk/table';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeadComponent } from './layout/head/head.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksUpdateComponent } from './tasks-update/tasks-update.component';
import { TasksCreateComponent } from './tasks-create/tasks-create.component';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { TasksDetailsDialog } from './tasks/tasks-details-dialog.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    LoginComponent,
    HomeComponent,
    InternalServerComponent,
    NotFoundComponent,
    RegisterComponent,
    TasksComponent,
    TasksUpdateComponent,
    TasksCreateComponent,
    AccountUpdateComponent,
    TasksDetailsDialog
  ],
  
  imports: [
    BrowserModule,
    NgbModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'users', loadChildren: "./user/user.module#UserModule", canActivate: [AuthGuard]},
      { path: '404', component: NotFoundComponent},
      { path: '500', component: InternalServerComponent },
      { path:'register', component:RegisterComponent},
      { path: 'login', component: LoginComponent },
      { path: 'tasks',component:TasksComponent, canActivate: [AuthGuard]},
      { path: 'tasks/create',component:TasksCreateComponent, canActivate: [AuthGuard]},
      { path: 'tasks/update/:id',component:TasksUpdateComponent, canActivate: [AuthGuard]},
      { path: 'account',component:AccountUpdateComponent, canActivate: [AuthGuard]},
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44317"],
        blacklistedRoutes: []
      }
    })
  ],
  exports: [
    MatDatepickerModule, 
    MatNativeDateModule,
    MaterialModule
],
  providers: [EnvironmentUrlService,RepositoryService,ErrorHandlerService,DatePipe,CdkColumnDef,AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [TasksDetailsDialog]
})
export class AppModule { }
