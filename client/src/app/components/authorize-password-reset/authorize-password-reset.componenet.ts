import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { IResetPassword, UserType } from 'src/app/shared/types';

@Component({
  selector: 'app-authorize-password-reset',
  templateUrl: './authorize-password-reset.componenet.html',
  styleUrls: []
})
export class AuthorizePasswordResetComponent implements OnInit {
  
  formData:IResetPassword={
    password:"",
    confirmPassword:"",
    username:"",
    _id:""
  }
  passwordMisMatchError: boolean = false;
  hide: boolean = true;
  constructor(private _userService: UserService, private _snackBar: MatSnackBar, private _matDialogRef: MatDialogRef<AuthorizePasswordResetComponent>,@Inject(MAT_DIALOG_DATA) data :IResetPassword) {
    this.formData = data;
   }

  ngOnInit(): void {
  }

  onSave(): void {
    if(this.formData.password!=this.formData.confirmPassword){
        this.passwordMisMatchError=true;
    }
    else{
        this.passwordMisMatchError=false;
        if(this.formData.password == this.formData.confirmPassword){
            this._userService.resetPassword(this.formData).subscribe({
                next: (data) => {
                  this._snackBar.open("User password reseted successfully.", "", {
                    duration: 3000,
                  });
                  this._matDialogRef.close();
                },
                error: (err) => {
                  this._snackBar.open(err?.error?.error, "OK");
                }
            })
        }    
    }
    
  }
  comparePassword():void{
    if(this.formData.password!=this.formData.confirmPassword){
        this.passwordMisMatchError=true;
    }
    else{
        console.log(this.passwordMisMatchError);
        this.passwordMisMatchError=false;
    }
  }

}
