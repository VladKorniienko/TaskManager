import { Component, OnInit, ViewChild } from '@angular/core';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Task } from '../_interfaces/task.model';
import { User } from '../_interfaces/user.model';
import { UserTask } from '../_interfaces/user-task.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TasksDetailsDialog } from './tasks-details-dialog.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public task: Task;
  public users: User[];
  public userTask:UserTask[];
 
  public errorMessage: string = '';
  public dataSource = new MatTableDataSource<UserTask>();
  public displayedColumns = ['name','deadline','status', 'delete', 'details', 'edit'];
  currentUserId:number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog,private repository: RepositoryService, private jwtHelper: JwtHelperService,
    private errorHandler: ErrorHandlerService, private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    let token: string = localStorage.getItem("jwt");
    this.currentUserId = this.jwtHelper.decodeToken(token)['unique_name'];
    this.getAllTasksForUser();
    this.dataSource.paginator = this.paginator;
  }
  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
   async openDialog(taskId:number) {
     this.getTaskById(taskId);
     await this.delay(300);
      const dialogRef = this.dialog.open(TasksDetailsDialog, {
      width: '500px',
      data: this.task
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  private getTaskById(taskId:number) {
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

   getAllTasksForUser(){
    
    let apiAddress: string = `api/UserTask/${this.currentUserId}`;
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.dataSource.data = res as UserTask[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

public refresh(){
  let refreshUrl: string = `/tasks`;
    this.router.navigate([refreshUrl]);
}


  public redirectToDetails(id:number){
    let taskUrl: string = `/userTasks/taskDetails/${id}`;
    this.router.navigate([taskUrl]);
  }

  public redirectToUpdate(id:number){
    let taskUrl: string = `/tasks/update/${id}`;
    this.router.navigate([taskUrl]);
  }

  public redirectToCreate(){
    let taskUrl: string = `/tasks/create`;
    this.router.navigate([taskUrl]);
  }

  public getAllTasksForUserValid(valid:number){
    let apiAddress: string = `api/UserTask/${this.currentUserId}?Valid=${valid}`;
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.dataSource.data = res as UserTask[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public getAllTasksForUserByStatus(status:string){
    let apiAddress: string = `api/UserTask/${this.currentUserId}?Status=${status}`;
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.dataSource.data = res as UserTask[];
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
  public deleteExecute(userId:number,taskId:number){
    this.deleteUserTask(userId,taskId);
    this.getAllTasksForUser();
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
