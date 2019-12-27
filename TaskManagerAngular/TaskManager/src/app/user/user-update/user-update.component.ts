import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  public errorMessage: string = '';
  public user: User;
  public userForm: FormGroup;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute,private _snackBar: MatSnackBar) { }

    ngOnInit() {
      this.userForm = new FormGroup({
        login: new FormControl('', [Validators.required, Validators.maxLength(60),Validators.minLength(6)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(60),Validators.minLength(6)]),
        name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        surname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        email: new FormControl('', [Validators.required, Validators.maxLength(60),Validators.email])
      });
     
      this.getUserById();
    }
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2500,
      });
    }
    private getUserById() {
      let userId: number = this.activeRoute.snapshot.params['id'];
        
      let userByIdUrl: string = `api/Users/${userId}`;
     
      this.repository.getData(userByIdUrl)
        .subscribe(res => {
          this.user = res as User;
          this.userForm.patchValue(this.user);
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
        
    }
    public redirectToUserList(){
      this.router.navigate(['/users']);
    }
    public hasError(controlName: string, errorName: string) {
      if (this.userForm.controls[controlName].hasError(errorName))
        return true;
   
      return false;
    }
    public validateControl(controlName: string) {
      if (this.userForm.controls[controlName].invalid && this.userForm.controls[controlName].touched)
        return true;
   
      return false;
    }
    public updateUser(userFormValue) {
      if (this.userForm.valid) {
        this.executeUserUpdate(userFormValue);
      }
    }
     
    private executeUserUpdate(userFormValue) {
     
      this.user.login = userFormValue.login;
      this.user.password = userFormValue.password;
      this.user.name = userFormValue.name;
      this.user.surname = userFormValue.surname;
      this.user.email = userFormValue.email;
     
      let apiUrl = `api/Users/${this.user.id}`;
      this.repository.update(apiUrl, this.user)
        .subscribe(res => 
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
    }

}
