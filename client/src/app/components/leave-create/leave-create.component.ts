import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { LeaveService } from 'src/app/services/leave.service';
import { ILeave, IUser, LeaveType, Status } from 'src/app/shared/types';

@Component({
  selector: 'app-leave-create',
  templateUrl: './leave-create.component.html',
  styleUrls: ['./leave-create.component.scss']
})
export class CreateLeaveComponent implements OnInit {
  formData: ILeave = {
    appliedBy: "",
    dateOfLeave: undefined,
    _id: "",
    reason: "",
    type: LeaveType.FULLDAY,
  }
  leaveTypeOptions = Object.values(LeaveType);

  hide: boolean = true;
  update: boolean = false;
  profile: boolean = false;
  constructor(private _authService: AuthService, private _leaveService: LeaveService, private _snackBar: MatSnackBar, private _matDialogRef: MatDialogRef<CreateLeaveComponent>, @Inject(MAT_DIALOG_DATA) public data: { updateLeave: boolean, title: string, status: Status, leave: ILeave, profile: boolean }) {
    this.update = this.data.updateLeave;
    if (this.data.updateLeave) {
      this.formData = this.data.leave;
    }
    this.profile = this.data.profile;
  }

  ngOnInit(): void {
  }

  onSave(): void {
    const loggedUser: IUser | null = this._authService.getLoggedInUser();
    
    this.formData.appliedBy = loggedUser?._id;
    this._leaveService.saveLeave(this.formData).subscribe({
      next: (data) => {
        this._snackBar.open("Leave created successfully.", "", {
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
  updateLeave(): void {
    debugger;
    const loggedUser: IUser | null = this._authService.getLoggedInUser();
    delete this.formData.appliedBy;    
    this.formData.appliedBy = loggedUser?._id;
    this._leaveService.updateLeave(this.formData, this.data.leave._id!).subscribe({
      next: (data) => {
        this._snackBar.open("Leave updated successfully.", "", {
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
}
