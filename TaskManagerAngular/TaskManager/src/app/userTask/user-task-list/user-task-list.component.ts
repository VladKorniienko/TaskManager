import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_interfaces/task.model';
import { User } from 'src/app/_interfaces/user.model';
import { UserTask } from 'src/app/_interfaces/user-task.model';
import { MatSnackBar } from '@angular/material';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-task-list',
  templateUrl: './user-task-list.component.html',
  styleUrls: ['./user-task-list.component.css']
})
export class UserTaskListComponent implements OnInit {
  public tasks: Task[];
  public users: User[];
  public userTask:UserTask[];
  public userIdArray:string[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllUsers();
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

  public redirectToUserDetails(id:number){
    let userUrl: string = `/userTasks/userDetails/${id}`;
    this.router.navigate([userUrl]);
  }

  public redirectToTaskDetails(id:number){
    let userUrl: string = `/userTasks/taskDetails/${id}`;
    this.router.navigate([userUrl]);
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
public deleteUserTask(userId:number,taskId:number) {
  this.openSnackBar('Successfully deleted! Refresh the page to see changes!','Close');
  let deleteUrl: string = `api/UserTask/${userId}/${taskId}`;
  this.repository.delete(deleteUrl)
    .subscribe(res =>
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
    
}

}



  

  


