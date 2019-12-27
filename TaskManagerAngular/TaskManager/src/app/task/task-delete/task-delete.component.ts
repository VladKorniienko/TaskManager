import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/_interfaces/task.model';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.css']
})
export class TaskDeleteComponent implements OnInit {
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
     
    public redirectToTaskList() {
      this.router.navigate(['/tasks']);
    }
    public deleteTask() {
      this.openSnackBar('Successfully deleted!','Close');
      let deleteUrl: string = `api/Tasks/${this.task.id}`;
      this.repository.delete(deleteUrl)
        .subscribe(res =>
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
    }

}
