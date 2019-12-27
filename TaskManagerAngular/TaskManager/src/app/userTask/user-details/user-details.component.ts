import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserOutput } from 'src/app/_interfaces/user-output.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public user: UserOutput;
  public errorMessage: string = '';
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUserById();
  }
  private getUserById() {
    let userId: string = this.activeRoute.snapshot.params['id'];
    let userByIdUrl: string = `api/Users/${userId}`;  
   
    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.user = res as UserOutput;
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
