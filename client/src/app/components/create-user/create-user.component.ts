import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { IUser, UserType, Status } from 'src/app/shared/types';
import * as moment from 'moment';
import { FilesService } from 'src/app/services/files.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  myControl = new FormControl();

  userTypeOptions = Object.keys(UserType);
  formData: IUser = {
    username: "",
    employeeId: "",
    contactPerson: {
      //email: "",
      mobileNo: "",
      name: ""
    },
    email: "",
    mobileNo: "",
    password: "",
    type: UserType.EMP,
    name: "",
    address: "",
    _id: "",
    joiningDate: undefined
  }

  hide: boolean = true;
  update: boolean = false;
  profile: boolean = false;
  constructor(private _userService: UserService, private _filesService: FilesService, private _snackBar: MatSnackBar, private _matDialogRef: MatDialogRef<CreateUserComponent>, @Inject(MAT_DIALOG_DATA) public data: { updateUser: boolean, title: string, status: Status, user: IUser, profile: boolean }) {
    this.update = this.data.updateUser;
    if (this.data.updateUser) {
      this.formData = this.data.user;
    }
    this.profile = this.data.profile;
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this._userService.saveUser(this.formData).subscribe({
      next: (data) => {
        this._snackBar.open("User created successfully.", "", {
          duration: 3000,
        });
        this._matDialogRef.close(true);
      },
      error: (err) => {
        let errorMsg: string[] = [];
        if (Array.isArray(err?.error?.error)) {
          err?.error?.error.forEach((errrr: any) => {
            errorMsg.push(errrr?.error)
          });
          this._snackBar.open(errorMsg.join(","), "OK");
        }
        else {
          this._snackBar.open(err?.error?.error, "OK");
        }
      }
    })
  }
  updateUser(): void {
    this._userService.updateUser(this.formData, this.data.user._id!).subscribe({
      next: (data) => {
        this._snackBar.open("User updated successfully.", "", {
          duration: 3000,
        });
        this._matDialogRef.close(true);
      },
      error: (err) => {
        let errorMsg: string[] = [];
        if (Array.isArray(err?.error)) {
          err?.error.forEach((errrr: any) => {
            errorMsg.push(errrr?.error)
          });
          this._snackBar.open(errorMsg.join(","), "OK");
        }
        else {
          this._snackBar.open(err?.error?.error, "OK");
        }
      }
    })
  }
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const selectedFile: File = event.target.files[0]
      const allowedExts: string[] = ["jpg", "jpeg", "png"];
      const ext: string = selectedFile.name.split(".").pop()?.toLocaleLowerCase() || "";
      if ((allowedExts.indexOf(ext) == -1 || selectedFile.size > 1000000)) {
        this._snackBar.open("Please select proper file", "OK");
        event.target.value = "";
        return;
      }
      const formData = new FormData();
      const newFilename = `${this.data.user._id}.${ext}`;
      formData.append(newFilename, selectedFile, newFilename);
      this._filesService.upload(formData).subscribe({
        next: (data) => {
          window.location.reload();
          this._snackBar.open("Photo uploaded successfully.", "", {
            duration: 3000,
          });
        },
        error: (err) => {
          let errorMsg: string[] = [];
          if (Array.isArray(err?.error)) {
            err?.error.forEach((errrr: any) => {
              errorMsg.push(errrr?.error)
            });
            this._snackBar.open(errorMsg.join(","), "OK");
          }
          else {
            this._snackBar.open(err?.error?.error, "OK");
          }
        }
      })
    }
    else {
      event.target.value = "";
    }

  }
}
