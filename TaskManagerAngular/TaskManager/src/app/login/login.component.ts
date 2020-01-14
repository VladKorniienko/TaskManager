import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserForLogin } from '../_interfaces/user-login.model';
import { RepositoryService } from '../shared/services/repository.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  public userForm: FormGroup;
  public errorMessage: string = '';
  constructor(private router: Router, private http: HttpClient,private repository: RepositoryService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
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

  public loginUser(userFormValue) {
    if (this.userForm.valid) {
      this.executeUserLogin(userFormValue);
    }
  }

  private executeUserLogin(userFormValue) {
    let user: UserForLogin = {
      login: userFormValue.login,
      password: userFormValue.password
    }
    let apiUrl = 'api/Users/authenticate';
    this.repository.create(apiUrl, user)
      .subscribe(response => {
        let token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.router.navigate(["/"]);
      }, err => {
        this.invalidLogin = true;
      });
    } 
      
}
