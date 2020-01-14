import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import {
  UserForCreation
} from '../_interfaces/user-create.model';
import {
  RepositoryService
} from '../shared/services/repository.service';
import {
  ErrorHandlerService
} from '../shared/services/error-handler.service';
import {
  ErrorStateMatcher
} from '@angular/material';



@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup;
  public errorMessage: string = '';
  Roles: any = ['Admin', 'User'];
  invalidForm: boolean;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.email]),
      role: new FormControl('', [Validators.required])
    });
  }


  public hasError(controlName: string, errorName: string) {
    if (this.userForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }

  public registerUser(userFormValue) {
    if (this.userForm.valid) {
      this.executeUserRegistration(userFormValue);
    }
  }

  public redirectToLoginPage() {
    let updateUrl: string = `/login`;
    this.router.navigate([updateUrl]);
  }

  private executeUserRegistration(userFormValue) {
    let user: UserForCreation = {
      login: userFormValue.login,
      password: userFormValue.password,
      name: userFormValue.name,
      surname: userFormValue.surname,
      email: userFormValue.email,
      role: userFormValue.role
    }

    let apiUrl = 'api/Users/register';
    this.repository.create(apiUrl, user)
      .subscribe(res =>{
        this.invalidForm = false;
        this.redirectToLoginPage();
      },
        (error => {
          this.invalidForm = true;
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }
}
