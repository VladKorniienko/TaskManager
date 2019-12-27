import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { MatSnackBar } from '@angular/material';
import { UserTask } from 'src/app/_interfaces/user-task.model';
import { UserTaskForCreation } from 'src/app/_interfaces/user-task-create.model';
import { UserOutput } from 'src/app/_interfaces/user-output.model';
import { Task } from 'src/app/_interfaces/task.model';

@Component({
  selector: 'app-user-task-create',
  templateUrl: './user-task-create.component.html',
  styleUrls: ['./user-task-create.component.css']
})
export class UserTaskCreateComponent implements OnInit {
  public errorMessage: string = '';
  public users: UserOutput[];
  public tasks: Task[];
  public userTaskForm: FormGroup;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllUsers();
    this.getAllTasks();
    this.userTaskForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      taskId: new FormControl('', [Validators.required]),
    });
  }

  public getAllUsers(){
    let apiAddress: string = "api/Users";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.users = res as UserOutput[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public getAllTasks(){
    let apiAddress: string = "api/Tasks";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.tasks = res as Task[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  public validateControl(controlName: string) {
    if (this.userTaskForm.controls[controlName].invalid && this.userTaskForm.controls[controlName].touched)
      return true;
 
    return false;
  }
 
  public hasError(controlName: string, errorName: string) {
    if (this.userTaskForm.controls[controlName].hasError(errorName))
      return true;
 
    return false;
  }
 
  
 
  public createUserTask(userTaskFormValue) {
    if (this.userTaskForm.valid) {
      this.executeUserTaskCreation(userTaskFormValue);
    }
  }
 
  private executeUserTaskCreation(userTaskFormValue) {
    let userTask: UserTaskForCreation = {
      userId: userTaskFormValue.userId,
      taskId: userTaskFormValue.taskId
    }
 
    
    let apiUrl = 'api/UserTask';
    this.repository.create(apiUrl, userTask)
      .subscribe(res => 
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }
 
  public redirectToUserTaskList(){
    this.router.navigate(['/userTasks']);
  }


}
