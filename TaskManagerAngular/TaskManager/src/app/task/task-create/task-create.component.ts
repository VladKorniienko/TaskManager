import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskForCreation } from './../../_interfaces/task-create.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  public errorMessage: string = '';

  public taskForm: FormGroup;
 
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router, private datePipe: DatePipe,private _snackBar: MatSnackBar) { }
 
  ngOnInit() {  
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      created: new FormControl(),
      deadline: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  public validateControl(controlName: string) {
    if (this.taskForm.controls[controlName].invalid && this.taskForm.controls[controlName].touched)
      return true;
 
    return false;
  }
 
  public hasError(controlName: string, errorName: string) {
    if (this.taskForm.controls[controlName].hasError(errorName))
      return true;
 
    return false;
  }
 
  
 
  public createTask(taskFormValue) {
    if (this.taskForm.valid) {
      this.executeTaskCreation(taskFormValue);
    }
  }
 
  private executeTaskCreation(taskFormValue) {
    let task: TaskForCreation = {
      name: taskFormValue.name,
      description: taskFormValue.description,
      created: this.datePipe.transform(Date.now(),'dd/MM/yyyy'),
      deadline: this.datePipe.transform(taskFormValue.deadline,'dd/MM/yyyy'),
      status: taskFormValue.status
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
 
  public redirectToTaskList(){
    this.router.navigate(['/tasks']);
  }
 
}