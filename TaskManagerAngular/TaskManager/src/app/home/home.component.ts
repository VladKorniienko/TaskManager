import { Component, OnInit } from '@angular/core';
import { Task } from '../_interfaces/task.model';
import { User } from '../_interfaces/user.model';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserTask } from '../_interfaces/user-task.model';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  public tasks: Task[];
  public users: User[];
  public userTask:UserTask[];
  public userIdArray:string[];
  public errorMessage: string = '';
 
 
  constructor(private jwtHelper: JwtHelperService, private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) { }
 
    isUserAuthenticated() {
      let token: string = localStorage.getItem("jwt");
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      else {
        return false;
      }
    }
    
    public logOut = () => {
      localStorage.removeItem("jwt");
    }

  public getAllUsers(){
    let apiAddress: string = "api/Users";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.users = res as User[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public getAllTasksForUser(login:string){
    let apiAddress: string = `api/UserTask/?Login=${login}`;
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.userTask = res as UserTask[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }
  
  public getAllUserTask(){
    let apiAddress: string = "api/UserTask";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.userTask = res as UserTask[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }
  public redirectToUserTasksPage(id:number){
    let updateUrl: string = `/users/${id}`;
    this.router.navigate([updateUrl]);
}
public deleteUserTask(userId:number,taskId:number) {
  this.openSnackBar('Successfully deleted!','Close');
  let deleteUrl: string = `api/UserTask/${userId}/${taskId}`;
  this.repository.delete(deleteUrl)
    .subscribe(res =>
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
}
}
