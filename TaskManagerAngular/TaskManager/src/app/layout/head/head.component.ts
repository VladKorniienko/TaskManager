import {
  Component
} from '@angular/core';
import {
  JwtHelperService
} from '@auth0/angular-jwt';
import {
  Router
} from '@angular/router';

@Component({

  selector: 'app-head',

  templateUrl: './head.component.html',

  styleUrls: ['./head.component.css']

})

export class HeadComponent {
  token:any;
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  isUserAuthenticated() {
    this.token = localStorage.getItem("jwt");
    if (this.token && !this.jwtHelper.isTokenExpired(this.token)) {
      return true;
    } else {
      return false;
    }
  }
  isUserAdmin(){
    let res = this.isUserAuthenticated();
    if(res==false)
      return false;
    let role = this.jwtHelper.decodeToken(this.token)['role'];
    if (role == "Admin" && res==true)
      return true;
    else
      return false;
  }

  public redirectToLoginPage() {
    this.logOut();
    let updateUrl: string = `/login`;
    this.router.navigate([updateUrl]);
  }

  public redirectToUsersPage() {
    let updateUrl: string = `/users`;
    this.router.navigate([updateUrl]);
  }

  public redirectToTasksPage() {
    let updateUrl: string = `/tasks`;
    this.router.navigate([updateUrl]);
  }

  public redirectToHomePage() {
    let updateUrl: string = `/home`;
    this.router.navigate([updateUrl]);
  }

  public redirectToRegisterPage() {
    this.logOut();
    let updateUrl: string = `/register`;
    this.router.navigate([updateUrl]);
  }
  public redirectToAccountPage() {
    let updateUrl: string = `/account`;
    this.router.navigate([updateUrl]);
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
  }

}
