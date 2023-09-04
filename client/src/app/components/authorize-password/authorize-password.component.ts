import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { IUser, IResetPassword } from 'src/app/shared/types';
import { AuthorizePasswordResetComponent } from '../authorize-password-reset/authorize-password-reset.componenet';

@Component({
  selector: 'app-authorize-password',
  templateUrl: './authorize-password.component.html',
  styleUrls: ['./authorize-password.component.scss']
})

export class AuthorizePasswordComponent implements OnInit {
  loading: boolean = false;
  displayedColumns: string[] = [
    '#',
    'Username',
    'Name of employee',
    'Empoloyee ID',
    'Mobile',
    'Email',
    'Joining Date',
  ];
  dataSource: IUser[] = [];

  constructor(private _dialog: MatDialog, private _userService: UserService) {
    this.getResetPasswordUsers();
   }

  ngOnInit(): void {
  }


  getResetPasswordUsers(): void {
    this.loading = true;
    this._userService.getResetPasswordUsers(1, 10).subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource = data.data!;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    })
  }

  openResetPasswordUser(user : IUser): void {
    const editdata : IResetPassword = {
      password:"",
      confirmPassword:"",
      username:user.username,
      _id:user._id
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = editdata;
    const dialogRef = this._dialog.open(AuthorizePasswordResetComponent,dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {      
      this.getResetPasswordUsers();
      
    });
  }

}
