import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { User } from './../../_interfaces/user.model';
import { UserOutput } from 'src/app/_interfaces/user-output.model';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: UserOutput[];
  public errorMessage: string = '';
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }
  public getAllUsers(){
    let apiAddress: string = "api/Users";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.users = res as UserOutput[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }
  public redirectToUpdatePage(id:number){
    let updateUrl: string = `/users/update/${id}`;
    this.router.navigate([updateUrl]);
}
public redirectToDeletePage(id:number){
  let deleteUrl: string = `/users/delete/${id}`;
  this.router.navigate([deleteUrl]);
}
}
