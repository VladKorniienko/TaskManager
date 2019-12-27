import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/_interfaces/task.model';
import { DatePipe } from '@angular/common';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {
  public errorMessage: string = '';
  public task: Task;
  public taskForm: FormGroup;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute, private datePipe: DatePipe,private _snackBar: MatSnackBar) { }

    ngOnInit() {
      this.taskForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
        deadline: new FormControl('', [Validators.required]),
         status: new FormControl('', [Validators.required])
    });
  
     
      this.getTaskById();
    }
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2500,
      });
    }
    private getTaskById() {
      let taskId: number = this.activeRoute.snapshot.params['id'];
        
      let taskByIdUrl: string = `api/Tasks/${taskId}`;
     
      this.repository.getData(taskByIdUrl)
        .subscribe(res => {
          this.task = res as Task;
          this.taskForm.patchValue(this.task);
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
        
    }
    public redirectToTaskList(){
      this.router.navigate(['/tasks']);
    }
    public hasError(controlName: string, errorName: string) {
      if (this.taskForm.controls[controlName].hasError(errorName))
        return true;
   
      return false;
    }
    public validateControl(controlName: string) {
      if (this.taskForm.controls[controlName].invalid && this.taskForm.controls[controlName].touched)
        return true;
   
      return false;
    }
    public updateTask(taskFormValue) {
      if (this.taskForm.valid) {
        this.executeTaskUpdate(taskFormValue);
      }
    }
     
    private executeTaskUpdate(taskFormValue) {
     
      this.task.name = taskFormValue.name;
      this.task.description = taskFormValue.description;
      this.task.deadline = this.datePipe.transform(taskFormValue.deadline,'dd/MM/yyyy');
      this.task.status= taskFormValue.status;
     
      let apiUrl = `api/Tasks/${this.task.id}`;
      this.repository.update(apiUrl, this.task)
        .subscribe(res => 
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
    }
}
