import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { RepositoryService } from '../shared/services/repository.service';
import { UserOutput } from '../_interfaces/user-output.model';
import { Task } from '../_interfaces/task.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskForCreation } from '../_interfaces/task-create.model';
import { DatePipe } from '@angular/common';
import { UserTaskForCreation } from '../_interfaces/user-task-create.model';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks-create.component.css']
})
export class TasksCreateComponent implements OnInit {
  public errorMessage: string = '';
  public users: UserOutput[];
  public createdTask:Task[];
  public taskForm:FormGroup;
  public id:string;
  constructor(private repository: RepositoryService,private datePipe: DatePipe,
     private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      deadline: new FormControl('', [Validators.required]),
      progress:new FormControl(''),
      userId: new FormControl('', [Validators.required])
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

  public createTask(taskFormValue) {
    if (this.taskForm.valid) {
      this.executeTaskCreation(taskFormValue);
    }
  }

  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 private async createTaskAndTieWithUser(taskFormValue){
  this.createTask(taskFormValue);
  await this.delay(200);
  this.getCreatedTask();
  await this.delay(200);
  this.id=JSON.parse(this.createdTask[0].id);
  this.executeUserTaskCreation(taskFormValue);
 }

  private executeTaskCreation(taskFormValue) {
    let task: TaskForCreation = {
      name: taskFormValue.name,
      description: taskFormValue.description,
      created: this.datePipe.transform(Date.now(),'dd/MM/yyyy'),
      deadline: this.datePipe.transform(taskFormValue.deadline,'dd/MM/yyyy'),
      status: "Created"
    }
    let apiUrl = 'api/Tasks';
    this.repository.create(apiUrl, task)
      .subscribe(res => 
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }

  public hasError(controlName: string, errorName: string) {
    if (this.taskForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }
 
  public createUserTask(taskFormValue) {
    if (this.taskForm.valid) {
      this.executeUserTaskCreation(taskFormValue);
    }
  }

  public getCreatedTask(){
    let apiAddress: string = `api/Tasks/?Name=${this.taskForm.value.name}`;
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.createdTask = res as Task[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
    
  }

  private executeUserTaskCreation(taskFormValue) {
    let userTask: UserTaskForCreation = {
      userId: taskFormValue.userId,
      taskId: this.id
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
 
}
