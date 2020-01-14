import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { User } from '../_interfaces/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {

  public errorMessage: string = '';
  public user: User;
  public userForm: FormGroup;
  currentUserId: string;
  
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService,private jwtHelper: JwtHelperService, private router: Router) { }

    ngOnInit() {
      let token: string = localStorage.getItem("jwt");
      this.currentUserId = this.jwtHelper.decodeToken(token)['unique_name'];
      this.userForm = new FormGroup({
        login: new FormControl('', [Validators.required,Validators.minLength(6)]),
        password: new FormControl('', [Validators.required,Validators.minLength(6)]),
        name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        surname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        email: new FormControl('', [Validators.required, Validators.maxLength(60),Validators.email]),
        role: new FormControl('')
      });
     
      this.getUserById();
    }
    
    private getUserById() {
     
      let userByIdUrl: string = `api/Users/${this.currentUserId}`;
     
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
    public hasError(controlName: string, errorName: string) {
      if (this.userForm.controls[controlName].hasError(errorName))
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
