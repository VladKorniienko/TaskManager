import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { UserOutput } from 'src/app/_interfaces/user-output.model';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  public errorMessage: string = '';
  public user: UserOutput;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute,private _snackBar: MatSnackBar) { }

    ngOnInit() {
      this.getUserById();
    }
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2500,
      });
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
     
    public redirectToUserList() {
      this.router.navigate(['/users']);
    }
    public deleteUser() {
      let deleteUrl: string = `api/Users/${this.user.id}`;
      this.openSnackBar('Successfully deleted!','Close');
      this.repository.delete(deleteUrl)
        .subscribe(res =>
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
    }

}
