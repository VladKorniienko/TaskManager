import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { RepositoryService } from './shared/services/repository.service';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkColumnDef } from '@angular/cdk/table';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    InternalServerComponent,
    NotFoundComponent
  ],
  
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialModule, 
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
      { path: 'tasks', loadChildren: "./task/task.module#TaskModule"},
      { path: 'users', loadChildren: "./user/user.module#UserModule"},
      { path: 'userTasks', loadChildren: "./userTask/userTask.module#UserTaskModule"},
      { path: '404', component: NotFoundComponent},
      { path: '500', component: InternalServerComponent },
      { path: '**', redirectTo: '/404', pathMatch: 'full'},
      
    ])
  ],
  exports: [
    MatDatepickerModule, 
    MatNativeDateModule,
    MaterialModule
],
  providers: [EnvironmentUrlService,RepositoryService,ErrorHandlerService,DatePipe,CdkColumnDef],
  bootstrap: [AppComponent]
})
export class AppModule { }
