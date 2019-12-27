import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_interfaces/task.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  public errorMessage: string = '';
  public task: Task;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTaskById();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  private getTaskById() {
    let taskId: string = this.activeRoute.snapshot.params['id'];
    let taskByIdUrl: string = `api/Tasks/${taskId}`;
   
    this.repository.getData(taskByIdUrl)
      .subscribe(res => {
        this.task = res as Task;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
  public redirectToUserTaskList() {
    this.router.navigate(['/userTasks']);
  }
}
