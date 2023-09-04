import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  constructor(private _userService: UserService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<UserDeleteComponent>,@Inject(MAT_DIALOG_DATA) public data: { _id: string }) {
  }

  ngOnInit(): void {
  }

  deleteUser(): void {
    this._userService.deleteUser(this.data._id).subscribe({
      next: (data) => {
        this._snackBar.open('User Deleted', "", {
          duration: 3000
        });
        this._dialog.close(true);
      },
      error: (err) => {
        if(err && err.error && err.error.statusCode==400){
          this._snackBar.open(err.error.error, "", {
            duration: 3000
          });
          this._dialog.close(true);
        }        
      }
    });
  }
}
