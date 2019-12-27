import { Component, OnInit } from '@angular/core';
import { Task } from './../../_interfaces/task.model';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks: Task[];
  public errorMessage: string = '';
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllTasks();
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
  public getAllTasksForUserValid(valid:number){
    let apiAddress: string = `api/Tasks/?Valid=${valid}`;
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.tasks = res as Task[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }
  public redirectToUpdatePage(id){
    let updateUrl: string = `/tasks/update/${id}`;
    this.router.navigate([updateUrl]);
}
public redirectToDeletePage(id){
  let deleteUrl: string = `/tasks/delete/${id}`;
  this.router.navigate([deleteUrl]);
}
}


 


 
  
 
  
 
  
