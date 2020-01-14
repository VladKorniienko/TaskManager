import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Inject, Component, OnInit, Optional } from '@angular/core';
import { UserTask } from '../_interfaces/user-task.model';
import { RepositoryService } from '../shared/services/repository.service';
import { Task } from '../_interfaces/task.model';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'tasks-details-dialog',
    templateUrl: 'tasks-details-dialog.html',
  })
  export class TasksDetailsDialog  {
    public errorMessage: string = '';
    public task: Task;
    constructor(
        @Optional() public dialogRef: MatDialogRef<TasksDetailsDialog>,@Optional() @Inject(MAT_DIALOG_DATA) public data: any
      ) {
          this.task=data;
      }
        
 
    onNoClick(): void {
      this.dialogRef.close();
    }


}