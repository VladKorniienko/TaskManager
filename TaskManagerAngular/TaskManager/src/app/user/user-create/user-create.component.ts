import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { UserForCreation } from 'src/app/_interfaces/user-create.model';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public errorMessage: string = '';
 
  public userForm: FormGroup;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {  
    this.userForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.maxLength(60),Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60),Validators.minLength(6)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(60),Validators.email])
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }
  public validateControl(controlName: string) {
    if (this.userForm.controls[controlName].invalid && this.userForm.controls[controlName].touched)
      return true;
 
    return false;
  }
 
  public hasError(controlName: string, errorName: string) {
    if (this.userForm.controls[controlName].hasError(errorName))
      return true;
 
    return false;
  }
 
  
 
  public createUser(userFormValue) {
    if (this.userForm.valid) {
      this.executeUserCreation(userFormValue);
    }
  }
 
  private executeUserCreation(userFormValue) {
    let user: UserForCreation = {
      login: userFormValue.login,
      password: userFormValue.password,
      name: userFormValue.name,
      surname: userFormValue.surname,
      email: userFormValue.email

    }
 
    
    let apiUrl = 'api/Users';
    this.repository.create(apiUrl, user)
      .subscribe(res => 
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }
 
  public redirectToUserList(){
    this.router.navigate(['/users']);
  }
 

}
